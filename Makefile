deploy:
	npm run build:prod
	rsync -avz --delete dist/ anaheim:~/sites/dashboard

run:
	npm run dev
