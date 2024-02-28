# End script when error
set -e

# build
npm run build

# cd
cd dist

git init
git add -A
git commit -m 'deploy'

# deploy to: https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:Lem-c/Geo-Data-Visualization.git master:gh-pages

cd -