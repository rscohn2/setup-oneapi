cmake_minimum_required(VERSION 3.20)
enable_language(Fortran)

project(setup-oneapi-tests)


include(CTest)

find_package(MKL)
find_package(MPI)

add_subdirectory(mkl)
add_subdirectory(compilers)
