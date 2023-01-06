deploy:
	npm run build
	rsync -avz dist/ anaheim:~/sites/dashboard

run:
	npm run dev
