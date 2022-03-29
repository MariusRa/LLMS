import "../../sass/Custom.scss"
import React from 'react';

const Footer = () =>{
	return(
		<footer className={"container-fluid mt-auto"}>
			<div className="afooter container">
			<div className="footer-left">
				<p className="footer-copyright">&copy; {new Date().getFullYear()} Festo Corporation. All Rights Reserved</p>
			</div>
			<div className="footer-right">
				<div className="footer-links">
					<a href="https://www.festo.com/us/en/e/legal/-id_3741/">Imprint</a>
					<a href="https://www.festo.com/us/en/e/privacy-statement-id_3749/">Data privacy</a>
					<a href="https://www.festo.com/us/en/e/legal/terms-and-conditions-of-sale-id_3747/">Terms and Conditions of Sale</a>
					<a className={"lastA"} href="https://www.festo.com/us/en/e/cloud-services-id_129924/">Cloud Services</a>
				</div>
			</div>
			</div>
		</footer>
	)
}

export default Footer;