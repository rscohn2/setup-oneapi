#!/bin/bash

#shellcheck disable=SC2010
LATEST_VERSION=$(ls -1 /opt/intel/oneapi/compiler/ | grep -v latest | sort | tail -1)
# shellcheck source=/dev/null
source /opt/intel/oneapi/setvars.sh

echo -n "mpif90?   "
echo $(which mpif90)
echo -n "mpiifort? "
echo $(which mpiifort)
echo -n "gfortran? "
echo $(which gfortran)
echo -n "ifx?      "
echo $(which ifx)

mpiifort -fc=ifx mpiifort-test.f90 -o build/mpiifort-test
# or use mpiifx

mpirun -np 2 build/mpiifort-test
