import { Link} from "react-router-dom";
import {useState, useEffect, useRef} from 'react';
import { Formik, Form, ErrorMessage as ErrorMes, Field } from 'formik';
import * as Yup from 'yup';
import './search.scss';
import useMarvelService from '../../services/MarvelService';

const Search = () => {
    const [labelView, setLabelView] = useState(null);
    const [charFound, setCharFound] = useState(null);
    const {getChar} = useMarvelService();

    const onRequest = (char) => {
        getChar(char).then(function() {
            setLabelView(`There is! Visit ${char} page?`);
            setCharFound(true);
        }).catch(function() {
            setLabelView('The character was not found. Check the name and try again');
            setCharFound(false);
        });
    }

    return (
        <Formik
        initialValues={{
            name: ''
        }}
        validationSchema={Yup.object({
            name: Yup.string().required('This field is required')
        })}
        onSubmit={value => onRequest(value.name)}
        >
            {formik => (
                <Form className="search__block">
                    <div>
                        <label className="search__label" htmlFor="name">Or find a character by name:</label>
                        <Field
                            placeholder="Enter name"
                            className="search__field"
                            id="name"
                            name="name"
                            type="text"
                        />   
                        {labelView ? (<div className="search__request" style={{'color': charFound ? 'black' : null}}>{labelView}</div>) : null}
                        <ErrorMes className="search__response" name='name' component='div'/>
                    </div>
                    <div className="search__blockBtn">
                        <button className="search__button button button__main" type="submit">
                            <div className="inner">find</div>
                        </button>
                        {
                            charFound ?
                            (<Link to={`/char/${formik.values.name}`}>
                                <button className="search__button button button__secondary" type='button' >
                                    <div className="inner">to page</div>
                                </button>
                            </Link>) : null
                        }
                    </div>
                </Form>    
            )}
        </Formik>
    )
}
export default Search;

{/* <Link to={`/char/${formik.values.name}`}> */}