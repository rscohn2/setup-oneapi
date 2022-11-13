================================
 setup-oneapi javascript action
================================

This action installs oneapi components. See example_.

Inputs
======

`cache`
-------

Speed up install by using GitHub cache. Default `true`.

`components`
------------

Components to install. Default none.

`fast`
------

Speed up cache save/restore by removing infrequently used
files. Default `true`.

`list`
------

Show the list of available components. Default `true`.

.. _example: https://github.com/rscohn2/test-setup-oneapi/blob/main/.github/workflows/main.yml
