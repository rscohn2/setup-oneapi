add_executable(icpx-test icpx-test.cpp)
add_test(NAME icpx-test COMMAND ./icpx-test)

add_executable(icx-test icx-test.c)
add_test(NAME icx-test COMMAND ./icx-test)

add_executable(ifx-test ifx-test.f90)
#set_property(TARGET ifx-test PROPERTY LINKER_LANGUAGE Fortran)
add_test(NAME ifx-test COMMAND ./ifx-test)
