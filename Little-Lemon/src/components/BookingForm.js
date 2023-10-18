import React, {useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const BookingForm = (props) => {

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        date: Yup.date().required('Date is required'),
        times: Yup.string().required('Time is required'),
        guests: Yup.number().required('Number of guests is required').min(1, 'Minimum number of guests is 1'),
    });

    const formik = useFormik({
        initialValues: {
          firstName: '',
          lastName: '',
          date: '',
          times: '',
          guests: '',
          occasion: '',
        },
        validationSchema: validationSchema,
        onSubmit: (e) => {
            props.submitForm(e);
        },
    });

    return (
        <header>
            <section>
                <div className='reservations'>
                    <h2>Make a reservation</h2>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <fieldset>
                        <div>
                            <label htmlFor='book-first-name'>First Name:</label>
                            <input id='book-first-name' name ='firstName' value={formik.values.firstName} onChange={formik.handleChange} type='text'/>
                            {formik.errors.firstName && (
                                <div className='error'>{formik.errors.firstName}</div>
                            )}
                        </div>
                        <div>
                            <label htmlFor='book-last-name'>Last Name:</label>
                            <input id='book-last-name' name ='lastName' value={formik.values.lastName} onChange={formik.handleChange} type='text'/>
                            {formik.errors.lastName && (
                                <div className='error'>{formik.errors.lastName}</div>
                            )}
                        </div>
                        <div>
                            <label htmlFor='book-date'>Choose Date:</label>
                            <input id='book-date' name='date' value={formik.values.date} onChange={formik.handleChange} type='date'/>
                            {formik.errors.date && (
                                <div className='error'>{formik.errors.date}</div>
                            )}
                        </div>

                        {/* for time selection */}
                        <div>
                            <label htmlFor='book-time'>Choose Time:</label>
                            <select id='book-time' name='times' value={formik.values.times} onChange={formik.handleChange}>
                                <option value="">Select a Time</option>
                                {
                                    props.availableTimes.availableTimes.map(availableTimes => {
                                        return <option key={availableTimes}>{availableTimes}</option>
                                    })
                                }
                            </select>
                            {formik.errors.times && (
                                <div className='error'>{formik.errors.times}</div>
                            )}
                        </div>

                        {/* for Number of guests */}
                        <div>
                            <label htmlFor='book-guests'>Number of Guests:</label>
                            <input id='book-guests' name='guests' type='number' min='1' value={formik.values.guests} onChange={formik.handleChange}/>
                            {formik.errors.guests && (
                                <div className='error'>{formik.errors.guests}</div>
                            )}
                        </div>

                        {/* for Occasion*/}
                        <div>
                            <label htmlFor='book-occasion'>Occasion:</label>
                            <select id='book-occasion' name='occasion' value={formik.values.occasion} onChange={formik.handleChange}>
                                <option>Birthday</option>
                                <option>Anniversary</option>
                            </select>
                        </div>

                        {/* Submit button */}
                        <div className='btnReceive'>
                            <input aria-label='On Click' type='submit' value={"Make Reservation"}/>
                        </div>
                    </fieldset>
                </form>
            </section>
        </header>
    );
};

export default BookingForm;