import { Link} from "react-router-dom";
import {useState, useEffect, useRef} from 'react';
import { Formik, Form, ErrorMessage as ErrorMes, Field } from 'formik';
import * as Yup from 'yup';
import './search.scss';
import useMarvelService from '../../services/MarvelService';

const Search = () => {
    const [labelRequest, setLabelRequest] = useState(null);
    const [buttonView, setButtonView] = useState(null);
    const {getChar} = useMarvelService();

    useEffect(() => {
        setLabelRequest(null);
    }, [])

    const onRequest = (char) => {
        getChar(char).then(function() {
            setLabelRequest(`There is! Visit ${char} page?`);
            setButtonView(true);
        }).catch(function() {
            setLabelRequest('The character was not found. Check the name and try again');
            setButtonView(false);
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
                    <label className="search__label" htmlFor="name">Or find a character by name:</label>
                    <Field
                        placeholder="Enter name"
                        className="search__field"
                        id="name"
                        name="name"
                        type="text"
                    />   
                    <button className="search__button button button__main" type="submit">
                        <div className="inner">find</div>
                    </button>
                    <Link to={`/char/${formik.values.name}`}>
                        <button className="search__button button button__secondary" type='button' style={{'display': buttonView ? 'inline-block' : 'none'}}>
                            <div className="inner">to page</div>
                        </button>
                    </Link>
                    <div>{labelRequest}</div>
                    <ErrorMes className="search__response" name='name' component='div'/>
                </Form>    
            )}
        </Formik>
    )
}
export default Search;

{/* <Link to={`/char/${formik.values.name}`}> */}