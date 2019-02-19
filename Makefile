deploy:
	npm run build:prod
	rsync -avz dist/ anaheim:~/sites/dashboard
