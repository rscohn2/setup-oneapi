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

Compile the package::

  npm run build

Commit changes and push.

.. _example: https://github.com/rscohn2/test-setup-oneapi/blob/main/.github/workflows/main.yml
