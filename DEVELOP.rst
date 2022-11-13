=============
 Development
=============

Testing
=======

After making changes::

  ncc build -o dist/main src/main.js --license licenses.txt && ncc build -o dist/cleanup src/cleanup.js --license licenses.txt && git add . && git commit -m update && git push
