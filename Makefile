deploy:
	npm run build
	rsync -avz --delete dist/ anaheim:~/sites/dashboard

run:
	npm run dev
