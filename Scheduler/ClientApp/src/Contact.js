import React from 'react'
import ReactDOM from 'react-dom'
import contact from './Resources/Contact.jpg';

function Contact() {
    return (
        <>
            <img class='bg' src={contact} />
            <div class='justify standardBackgroundColour'>
                <h2 class="centeredRow whiteSpace">Contact</h2>
                <address>
                    <p>To contribute to this project, please contact the author.</p>
                    <p>The source code to the web application may be found on the Git Hub source repository provided below.</p>
                    <abbr title="Email">E:</abbr>
                        dejan.dp.popovic@gmail.com<br />
                    <abbr title="Git hub profile">G:</abbr>
                    <a href="https://github.com/DejanPopovic1">https://github.com/DejanPopovic1</a><br />
                </address>
            </div>
        </>
    );
}

export default Contact;
