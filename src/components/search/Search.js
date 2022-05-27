import { Link} from "react-router-dom";
import {useState, useEffect} from 'react';
import { Formik, Form, ErrorMessage as ErrorMes, Field } from 'formik';
import * as Yup from 'yup';
import './search.scss';
import useMarvelService from '../../services/MarvelService';

const Search = () => {
    const [labelView, setLabelView] = useState(null);
    const [inputName, setInputName] = useState(null);
    const [charName, setCharName] = useState(null);
    const {getChar} = useMarvelService();

    useEffect(() => {
        setLabelView(null)
        setCharName(null)
    }, [inputName])

    const onRequest = (char) => {
        getChar(char).then(function() {
            setLabelView(`There is! Visit ${char} page?`);
            setCharName(char);
        }).catch(function() {
            setLabelView(`The character was not found. Check the name andtry again`);
            setCharName(null);
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
                            setInputName={setInputName(formik.values.name)}
                        />  
                        {labelView ? (<div className="search__request" style={{'color': charName ? 'black' : null}}>{labelView}</div>) : null}
                        <ErrorMes className="search__response" name='name' component='div'/>
                    </div>
                    <div className="search__blockBtn">
                        <button className="search__button button button__main" type="submit">
                            <div className="inner">find</div>
                        </button>
                        {
                            charName ?
                            (<Link to={`/char/${charName}`}>
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
