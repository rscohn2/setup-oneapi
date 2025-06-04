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
the corresponding spack packages.

.. list-table::
   :header-rows: 1

   * - update src/main.js
     - spack package
   * - ccl
     - `intel-onepi-ccl`_
   * - dal
     - `intel-onepi-dal`_
   * - dnn
     - `intel-onepi-dnn`_
   * - dpl
     - `intel-onepi-dpl`_
   * - icx/ifx
     - `intel-onepi-compilers`_
   * - impi
     - `intel-onepi-mpi`_
   * - ipp
     - `intel-onepi-ipp`_
   * - ippcp
     - `intel-onepi-ippcp`_
   * - mkl
     - `intel-onepi-mkl`_
   * - tbb
     - `intel-onepi-tbb`_

Compile the package::

  npm run build

Commit changes and submit via PR.

If CI passes, merge main branch into v0 branch.

You can add test cases to: CI_.

.. _`intel-onepi-ccl`:       https://github.com/spack/spack/blob/develop/var/spack/repos/spack_repo/builtin/packages/intel_oneapi_ccl/package.py
.. _`intel-onepi-compilers`: https://github.com/spack/spack/blob/develop/var/spack/repos/spack_repo/builtin/packages/intel_oneapi_compilers/package.py
.. _`intel-onepi-dal`:       https://github.com/spack/spack/blob/develop/var/spack/repos/spack_repo/builtin/packages/intel_oneapi_dal/package.py
.. _`intel-onepi-dnn`:       https://github.com/spack/spack/blob/develop/var/spack/repos/spack_repo/builtin/packages/intel_oneapi_dnn/package.py
.. _`intel-onepi-dpl`:       https://github.com/spack/spack/blob/develop/var/spack/repos/spack_repo/builtin/packages/intel_oneapi_dpl/package.py
.. _`intel-onepi-ipp`:       https://github.com/spack/spack/blob/develop/var/spack/repos/spack_repo/builtin/packages/intel_oneapi_ipp/package.py
.. _`intel-onepi-ippcp`:     https://github.com/spack/spack/blob/develop/var/spack/repos/spack_repo/builtin/packages/intel_oneapi_ippcp/package.py
.. _`intel-onepi-mkl`:       https://github.com/spack/spack/blob/develop/var/spack/repos/spack_repo/builtin/packages/intel_oneapi_mkl/package.py
.. _`intel-onepi-mpi`:       https://github.com/spack/spack/blob/develop/var/spack/repos/spack_repo/builtin/packages/intel_oneapi_mpi/package.py
.. _`intel-onepi-tbb`:       https://github.com/spack/spack/blob/develop/var/spack/repos/spack_repo/builtin/packages/intel_oneapi_tbb/package.py

.. _CI: .github/workflows/main.yml
.. _example: https://github.com/rscohn2/test-setup-oneapi/blob/main/.github/workflows/main.yml
.. _nvm: https://github.com/nvm-sh/nvm
