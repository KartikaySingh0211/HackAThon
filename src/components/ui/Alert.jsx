import PropTypes from "prop-types";

export const Alert = ({ children, className = "" }) => {
	return (
		<div className={`p-4 border-l-4 rounded ${className}`}>{children}</div>
	);
};

export const AlertDescription = ({ children }) => {
	return <div className="text-gray-800">{children}</div>;
};

Alert.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

AlertDescription.propTypes = {
	children: PropTypes.node,
};
