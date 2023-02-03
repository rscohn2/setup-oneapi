find_package(MKL)

add_executable(mkl-test mkl-test.cpp)
target_link_libraries(mkl-test PRIVATE MKL::MKL)
add_test(NAME mkl-test COMMAND ./mkl-test)
