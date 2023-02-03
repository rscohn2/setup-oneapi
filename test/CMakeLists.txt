cmake_minimum_required(VERSION 3.20)
enable_language(Fortran)

project(setup-oneapi-tests)

option(ENABLE_MKL "Enable MKL tests" OFF)
option(ENABLE_COMPILERS "Enable Intel Compiler tests" OFF)

include(CTest)

if(ENABLE_MKL)
  add_subdirectory(mkl)
endif()

if(ENABLE_COMPILERS)
  add_subdirectory(compilers)
endif()
