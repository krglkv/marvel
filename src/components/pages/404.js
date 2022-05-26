import ErrorMessage from "../errorMessage/ErrorMessage";
import {Link, useNavigate} from 'react-router-dom';

const Page404 = () => {
    const navigate = useNavigate();

    function goBack() {
        navigate(-1);
    }

    return (
        <div>
            <ErrorMessage/>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Page doesn't exist</p>
            <button onClick={goBack} style={{'display': 'block','margin': '0 auto', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px', 'backgroundColor': 'rgba(28,28,28,0)', 'borderRadius': '10px'}}>Back to main page</button>
        </div>
    )
}

export default Page404;