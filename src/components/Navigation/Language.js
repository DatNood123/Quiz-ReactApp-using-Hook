import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next';

const Language = (props) => {
    const { i18n } = useTranslation();
    const name = i18n.language === 'en' ? 'English' : 'Tiếng Việt';

    const handleChangLanguage = (language) => {
        i18n.changeLanguage(language)
    }

    return (
        <>
            <NavDropdown title={name} id="language-nav-dropdown" className='change-language'>
                <NavDropdown.Item onClick={() => handleChangLanguage('vi')}>
                    Tiếng Việt
                </NavDropdown.Item>

                <NavDropdown.Item onClick={() => handleChangLanguage('en')}>
                    English
                </NavDropdown.Item>
            </NavDropdown>
        </>
    )
}

export default Language;