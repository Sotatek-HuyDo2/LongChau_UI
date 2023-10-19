deploy-staging:
	cp .env.staging.example .env
	npm run build
	echo "Uploading to s3"
	aws s3 sync ./build s3://blocksniper.io
	aws s3 sync ./build s3://blocksniper.io
	  rm -f ./build/index.html
	echo "Deploy client finished!"
	aws cloudfront create-invalidation \
        --distribution-id E1N1NEPHJJINQF \
        --paths "/*"
