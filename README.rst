==============
 setup-oneapi
==============

This GitHub action installs oneapi components. See example_.

Inputs
======

`cache`
-------

Speed up install by using GitHub cache. Default `true`.

`components`
------------

Components to install. Default none.

`prune`
-------

Speed up cache save/restore by removing infrequently used
files. Default `true`.

`list`
------

Show the list of available components. Default `false`.

Developer Info
==============

Install dependencies::

  npm i -g @vercel/ncc
  npm install

Run checkers as part of pre-commit hook::

  pip install pre-commit
  pre-commit install

You can also run checkers manually::

  pre-commit run --all

``pre-commit`` automatially fixes most errors. Add the changed files
to your commit and try again.

Compile the package::

  npm run build

Commit changes and push.

You can add test cases to: CI_.

.. _CI: .github/workflows/main.yml
.. _example: https://github.com/rscohn2/test-setup-oneapi/blob/main/.github/workflows/main.yml
