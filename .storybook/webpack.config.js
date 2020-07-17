const path = require('path');
module.exports = ({ config }) => {
	config.module.rules = config.module.rules.filter(
		(f) => f.test.toString() !== '/\\.css$/'
	);
	config.module.rules.push({
		test: /\.(ts|tsx)$/,
		use: [
			{
				loader: require.resolve('awesome-typescript-loader'),
			},
			{
				loader: require.resolve('react-docgen-typescript-loader'),
			},
		],
	});

	config.module.rules.push(		{
			test: /\.css$/,
			loaders: ['style-loader', 'css-loader'],
			include: path.resolve(__dirname, '../src/'),
		}
	);
	config.resolve.extensions.push('.ts', '.tsx');
	return config;
};