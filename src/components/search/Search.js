import { Link} from "react-router-dom";
import {useState, useEffect} from 'react';
import { Formik, Form, ErrorMessage as FormikErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import ErrorMessage from "../errorMessage/ErrorMessage";
import './search.scss';
import useMarvelService from '../../services/MarvelService';

const Search = () => {
    const [char, setChar] = useState(null);
    const {getCharByName, clearError, error, loading} = useMarvelService();

    // useEffect(() => {
    //     setLabelView(null)
    //     setChar(null)
    // }, [inputName])

    // useEffect(() => {
    //     console.log(char)
    // }, [char])

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const updateChar = (name) => {
        clearError();
        getCharByName(name).then(onCharLoaded);
    }

    const errorMes = error ? <div className="search__critical-error"><ErrorMessage /></div> : null
    const results = !char ? null : char.length > 0 ?
                    <div className="search__wrapper">
                        <div className="search__success">There is! Visit {char[0].name} page?</div>
                        <Link to={`/char/${char[0].id}`} className="button button__secondary" type='button'>
                            <div className="inner">to page</div>
                        </Link>
                    </div> :
                    <div className="search__error">
                        The character was not found. Check the name and try again
                    </div>

    return (
        <div className="search__block">
            <Formik
            initialValues={{
                name: ''
            }}
            validationSchema={Yup.object({
                name: Yup.string().required('This field is required')
            })}
            onSubmit={value => updateChar(value.name)}
            >
                {formik => (
                    <Form>
                        <label className="search__label" htmlFor="name">Or find a character by name:</label>
                        <div className="search__wrapper">
                            <Field
                                placeholder="Enter name"
                                id="name"
                                name="name"
                                type="text"
                            />
                            <button className="button button__main" type="submit" disabled={loading}>
                                <div className="inner">find</div>
                            </button>      
                        </div>
                        <FormikErrorMessage className="search__error" name='name' component='div'/>
                        {results}
                        {errorMes}
                    </Form>    
                )}
            </Formik>
        </div>
    )
}
export default Search;