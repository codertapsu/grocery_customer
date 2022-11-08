import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { NextPage } from 'next';

import { CreditCard } from '@components/credit-card';
import { Layout } from '@components/layout/layout';
import { Item } from '@components/select';
import { StripeForm } from '@components/stripe-form';
import { useCreditCards } from '@contexts/credit-cards';
import { StoreState, useReduxStore } from '@contexts/redux-store';
import { CreditCard as CardShape } from '@models/credit-card.model';

const CreditCards: NextPage = () => {
  const { getSavedCards } = useCreditCards();
  const [cards, setCards] = useState<CardShape[]>([]);
  const cartItems = useSelector<StoreState, StoreState['cart']>((state) => state.cart);
  const { closeCart, increaseQuantity, decreaseQuantity, deleteFromCart, openCart, clearCart } = useReduxStore();
  const price = () => {
    let price = 0;
    cartItems.forEach((item) => (price += item.price * item.quantity));

    return price;
  };

  const items: Item<string>[] = [
    { id: '1', text: 'Alpine' },
    { id: '2', text: 'Badges' },
    { id: '3', text: 'Buttons' },
    { id: '4', text: 'Cards' },
    { id: '5', text: 'Forms' },
    { id: '6', text: 'Modals' },
  ];

  const onCreatedPaymentMethod = async (paymentMethodId: string) => {
    //
  };

  useEffect(() => {
    const abortController = new AbortController();
    const fetchCards = async () => {
      const cards = await getSavedCards(abortController);
      setCards(cards);
    };
    fetchCards();
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <Layout parent='Home' sub='Shop' subChild='Checkout'>
        <section className='mt-50 mb-50'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-8 mb-40'>
                <h1 className='heading-2 mb-10'>Credit Cards</h1>
                <div className='d-flex justify-content-between'>
                  <h6 className='text-body'>
                    There are <span className='text-brand'>3</span> products in your cart
                  </h6>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-7'>
                <ul>
                  {cards.map((card) => (
                    <li key={card.id}>
                      <div className='py-3'>
                        <CreditCard card={card} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='col-lg-5'>
                <StripeForm />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default CreditCards;
