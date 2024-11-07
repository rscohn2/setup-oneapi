==============
 setup-oneapi
==============


.. image:: https://github.com/rscohn2/setup-oneapi/actions/workflows/main.yml/badge.svg
   :target: https://github.com/rscohn2/setup-oneapi/actions/workflows/main.yml

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

Use nvm_ to install node.

Install dependencies::

  npm i @vercel/ncc
  npm install

If you already installed then update with::

  npm update

Run checkers as part of pre-commit hook::

  pip install pre-commit
  pre-commit install

You can also run checkers manually::

  pre-commit run --all

``pre-commit`` automatically fixes most errors. Add the changed files
to your commit and try again.

To publish a new oneapi release, update src/main.js. Get the URLS from
`spack mkl package`_ and similar for the other packages. icx/ifx are
in intel-oneapi-compilers package.

Compile the package::

  npm run build

Commit changes and submit via PR.

If CI passes, merge main branch into v0 branch.

You can add test cases to: CI_.

.. _`spack mkl package`: https://github.com/spack/spack/blob/develop/var/spack/repos/builtin/packages/intel-oneapi-mkl/package.py
.. _CI: .github/workflows/main.yml
.. _example: https://github.com/rscohn2/test-setup-oneapi/blob/main/.github/workflows/main.yml
.. _nvm: https://github.com/nvm-sh/nvm
