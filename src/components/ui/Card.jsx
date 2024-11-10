import PropTypes from "prop-types";

export const Card = ({ children, className = "" }) => {
	return (
		<div className={`bg-white shadow rounded-lg p-4 ${className}`}>
			{children}
		</div>
	);
};

export const CardHeader = ({ children }) => {
	return <div className="pb-4 border-b border-gray-200">{children}</div>;
};

export const CardTitle = ({ children }) => {
	return <h2 className="text-xl font-semibold">{children}</h2>;
};

export const CardContent = ({ children }) => {
	return <div className="pt-4">{children}</div>;
};

Card.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

CardHeader.propTypes = {
	children: PropTypes.node,
};

CardTitle.propTypes = {
	children: PropTypes.node,
};

CardContent.propTypes = {
	children: PropTypes.node,
};
