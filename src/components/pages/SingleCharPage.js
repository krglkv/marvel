import { useParams, Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { useState, useEffect } from "react/cjs/react.development";

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './singleComicPage.scss';

const SingleCharPage = () => {
    const {charName} = useParams();
    const [char, setChar] = useState(null);
    const {loading, error, getChar, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [charName])
    
    const updateChar = () => {
        clearError();
        getChar(charName)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }
    
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;
    return (
        <div className="single-comic">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail} = char;

    return (
        <>
            <img src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
            <Link to={'/'} className="single-comic__back">Back to all</Link>
        </>
    )
}

export default SingleCharPage;