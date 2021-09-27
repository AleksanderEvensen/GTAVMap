const { publish } = require('gh-pages');

publish(
	'public', // path to public directory
	{
		branch: 'gh-pages',
		repo: 'https://github.com/AleksanderEvensen/GTAVMap.git', // Update to point to your repository
		user: {
			name: 'AleksanderEvensen', // update to use your name
			email: '' // Update to use your email
		},
		dotfiles: true
	},
	() => {
		console.log('Deploy Complete!');
	}
);