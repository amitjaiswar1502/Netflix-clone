import React, { useEffect, useState } from 'react';
import {
    collection,
    doc,
    query,
    where,
    getDocs,
    onSnapshot,
    addDoc,
} from "firebase/firestore";
import { loadStripe } from "@stripe/stripe-js";
import { db } from '../../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from "../../features/userSlice";
import "./PlanScreen.css";


const PlanScreen = () => {

    const [products, setProducts] = useState([]);
    const [subscription, setSubscription] = useState(null);
    const user = useSelector(selectUser);

    useEffect(() => {
        const q = query(collection(db, "customers", user.uid, "subscriptions"));

        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach(async (subscription) => {
                // console.log(subscription.data());

                setSubscription({
                    role: subscription.data().role,
                    current_period_start:
                        subscription.data().current_period_start.seconds,
                    current_period_end: subscription.data().current_period_end.seconds,
                });
            });
        });
    }, [user.uid]);



    useEffect(() => {
        const q = query(collection(db, "products"), where("active", "==", true));

        onSnapshot(q, (querySnapshot) => {
            const products = {};

            querySnapshot.forEach(async (productDoc) => {
                products[productDoc.id] = productDoc.data();

                const productDocRef = doc(db, "products", productDoc.id);

                const priceSnap = await getDocs(collection(productDocRef, "prices"));

                priceSnap.forEach((price) => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data(),
                    };
                });
            });
            setProducts(products);
        });
    }, []);

    console.log(products);
    console.log(subscription)

    const loadCheckOut = async (priceId) => {
        const docRef = await addDoc(
            collection(db, "customers", user.uid, "checkout_sessions"),
            {
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin,
            }
        );

        onSnapshot(docRef, async (snap) => {
            const { error, sessionId } = snap.data();

            if (error) {
                // Show an error to a customer and inspect your
                // Cloud functions logs in the firebase console.
                alert(`An error occurred: ${error.message}`);
            }
            if (sessionId) {
                // We have a session, let's redirect to Checkout
                // Init Stripe
                const stripe = await loadStripe(
                    "pk_test_51N94mISGdj1D1kq27rjk9yw4qXG3ACUjFKc8ASqsirpyVaYzNec0Lb4GzG0gDV2LXOmxm6Ept9dU4fdfY3oNcFit00qufdatmT"
                );
                stripe.redirectToCheckout({ sessionId });
            }
        });
    };


    return (

        <>

            <div className="plansScreen">
                <br />
                {subscription && (
                    <p className="plansScreen__renewal">
                        Renewal date:{" "}
                        {new Date(subscription?.current_period_end * 1000).toLocaleDateString(
                            "CS-cs"
                        )}
                    </p>
                )}
                {Object.entries(products).map(([productId, productData]) => {
                    // TODO: Add some logic to check if the user's subscription is active
                    const isCurrentPackage = productData.name
                        ?.toLowerCase()
                        .includes(subscription?.role);

                    return (
                        <div
                            key={productId}
                            className={`${isCurrentPackage && "planScreen-Plan--disabled"
                                } planScreen-Plan`}
                        >
                            <div className="plansScreen__info">
                                <h5>{productData.name}</h5>
                                <h6>{productData.description}</h6>
                            </div>

                            <button
                                onClick={() =>
                                    !isCurrentPackage && loadCheckOut(productData.prices.priceId)
                                }
                            >
                                {isCurrentPackage ? "Current Plan" : "Subscribe"}
                            </button>
                        </div>
                    );
                })}
            </div>

        </>
    )
}

export default PlanScreen
