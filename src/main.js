const path = require('path')
const process = require('process')

const cache = require('@actions/cache')
const core = require('@actions/core')
const exec = require('@actions/exec')
const io = require('@actions/io')
const tc = require('@actions/tool-cache')

const glob = require('glob')

let key = 'v1'

const configs = {
  linux: {
    urls: {
      ccl: 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/88a7a6db-816c-4cd5-993f-821729da5648/intel-oneccl-2021.14.0.506_offline.sh',
      'ccl@2021.14.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/88a7a6db-816c-4cd5-993f-821729da5648/intel-oneccl-2021.14.0.506_offline.sh',
      'ccl@2021.13.1': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/4b4cf672-c1f9-4bac-97c4-f4ae10a0a020/l_oneapi_ccl_p_2021.13.1.32_offline.sh',
      'ccl@2021.13.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/2413acba-2216-4a35-9c74-82694a20d176/l_oneapi_ccl_p_2021.13.0.300_offline.sh',
      'ccl@2021.12.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/cad4b3be-a272-4ed0-b67a-3871e495cb28/l_oneapi_ccl_p_2021.12.0.311_offline.sh',
      'ccl@2021.11.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/07958f2f-8d95-422d-8c18-a4c7352b005c/l_oneapi_ccl_p_2021.11.1.9_offline.sh',
      'ccl@2021.10.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/3230823d-f799-4d1f-8ef3-a17f086a7719/l_oneapi_ccl_p_2021.10.0.49084_offline.sh',
      'ccl@2021.9.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/44e093fc-663b-4ae5-9c08-24a55211aca3/l_oneapi_ccl_p_2021.9.0.43543_offline.sh',
      'ccl@2021.8.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/19135/l_oneapi_ccl_p_2021.8.0.25371_offline.sh',
      'ccl@2021.7.1': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/19029/l_oneapi_ccl_p_2021.7.1.16948_offline.sh',

      dal: 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/d9f2cdb2-93ec-4c78-a3fb-a59d27050c16/intel-onedal-2025.0.0.958_offline.sh',
      'dal@2025.0.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/d9f2cdb2-93ec-4c78-a3fb-a59d27050c16/intel-onedal-2025.0.0.958_offline.sh',
      'dal@2024.7.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/ed2c397a-9a78-4466-9179-b39b7da07e83/l_daal_oneapi_p_2024.7.0.14_offline.sh',
      'dal@2024.6.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/1edf7074-80f8-4b97-aad3-5023b41b7ecd/l_daal_oneapi_p_2024.6.0.418_offline.sh',
      'dal@2024.5.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/6ca2d1a8-b7c7-4a70-9c38-2b437dacae1a/l_daal_oneapi_p_2024.5.0.284_offline.sh',
      'dal@2024.2.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/3cee4c6c-b7d1-42ce-8bbb-d829a700952f/l_daal_oneapi_p_2024.2.0.280_offline.sh',
      'dal@2024.0.0': 'https://registrationcenter-download.intel.com/akdlm//IRC_NAS/37364086-b3cd-4a54-8736-7893732c1a86/l_daal_oneapi_p_2024.0.0.49569_offline.sh',
      'dal@2023.2.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/fa218373-4b06-451f-8f4c-66b7d14b8e8b/l_daal_oneapi_p_2023.2.0.49574_offline.sh',
      'dal@2023.1.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/c209d29f-3d06-45fb-8f04-7b2f47b93a7c/l_daal_oneapi_p_2023.1.0.46349_offline.sh',
      'dal@2023.0.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/19122/l_daal_oneapi_p_2023.0.0.25395_offline.sh',
      'dal@2021.7.1': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/19032/l_daal_oneapi_p_2021.7.1.16996_offline.sh',

      dnn: 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/87e117ab-039b-437d-9c80-dcd5c9e675d5/intel-onednn-2025.0.0.862_offline.sh',
      'dnn@2025.0.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/87e117ab-039b-437d-9c80-dcd5c9e675d5/intel-onednn-2025.0.0.862_offline.sh',
      'dnn@2024.2.1': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/7c850be0-b17d-4b7f-898d-3bc5fc36aa8d/l_onednn_p_2024.2.1.76_offline.sh',
      'dnn@2024.2.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/6f830f51-56cd-4ea6-ade7-0f066c9b1939/l_onednn_p_2024.2.0.571_offline.sh',
      'dnn@2024.1.1': 'https://registrationcenter-download.intel.com/akdlm//IRC_NAS/5f6d82fa-2580-4bb1-83bb-cce7a52d1d34/l_onednn_p_2024.1.1.16_offline.sh',
      'dnn@2024.1.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/759e8b2a-cbff-4b4f-ad88-08deb7730e73/l_onednn_p_2024.1.0.571_offline.sh',
      'dnn@2024.0.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/dc309221-d210-4f3a-9406-d897df8deab8/l_onednn_p_2024.0.0.49548_offline.sh',
      'dnn@2023.2.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/2d218b97-0175-4f8c-8dba-b528cec24d55/l_onednn_p_2023.2.0.49517_offline.sh',
      'dnn@2023.1.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/df0fd85e-f52a-437a-8d49-be12b560607c/l_onednn_p_2023.1.0.46343_offline.sh',
      'dnn@2023.0.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/19137/l_onednn_p_2023.0.0.25399_offline.sh',
      'dnn@2022.2.1': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/19035/l_onednn_p_2022.2.1.16994_offline.sh',

      dpl: 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/85ad74ff-f4fa-45e2-b50d-67d637d42baa/intel-onedpl-2022.7.0.647_offline.sh',
      'dpl@2022.7.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/85ad74ff-f4fa-45e2-b50d-67d637d42baa/intel-onedpl-2022.7.0.647_offline.sh',
      'dpl@2022.6.1': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/fe007d71-c49f-4cdd-8a95-5c8e29c5b19c/l_oneDPL_p_2022.6.1.15_offline.sh',
      'dpl@2022.6.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/65565430-3eb6-49ad-ae51-e35314cc6f08/l_oneDPL_p_2022.6.0.560_offline.sh',
      'dpl@2022.5.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/d0be9e37-532e-4fde-9ac2-32c3ec5a2029/l_oneDPL_p_2022.5.0.219_offline.sh',
      'dpl@2022.3.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/be027095-148a-4433-aff4-c6e8582da3ca/l_oneDPL_p_2022.3.0.49386_offline.sh',
      'dpl@2022.2.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/44f88a97-7526-48f0-8515-9bf1356eb7bb/l_oneDPL_p_2022.2.0.49287_offline.sh',
      'dpl@2022.1.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/64075e93-4134-4d18-8941-827b71b7d8b9/l_oneDPL_p_2022.1.0.43490_offline.sh',
      'dpl@2022.0.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/19133/l_oneDPL_p_2022.0.0.25335_offline.sh',
      'dpl@2021.7.2': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/19046/l_oneDPL_p_2021.7.2.15007_offline.sh',

      icx: 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/ac92f2bb-4818-4e53-a432-f8b34d502f23/intel-dpcpp-cpp-compiler-2025.0.0.740_offline.sh',
      'icx@2025.0.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/ac92f2bb-4818-4e53-a432-f8b34d502f23/intel-dpcpp-cpp-compiler-2025.0.0.740_offline.sh',
      'icx@2024.2.1': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/74587994-3c83-48fd-b963-b707521a63f4/l_dpcpp-cpp-compiler_p_2024.2.1.79_offline.sh',
      'icx@2024.2.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/6780ac84-6256-4b59-a647-330eb65f32b6/l_dpcpp-cpp-compiler_p_2024.2.0.495_offline.sh',
      'icx@2024.1.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/2e562b6e-5d0f-4001-8121-350a828332fb/l_dpcpp-cpp-compiler_p_2024.1.0.468_offline.sh',
      'icx@2024.0.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/5c8e686a-16a7-4866-b585-9cf09e97ef36/l_dpcpp-cpp-compiler_p_2024.0.0.49524_offline.sh',
      'icx@2023.2.1': 'https://registrationcenter-download.intel.com/akdlm//IRC_NAS/ebf5d9aa-17a7-46a4-b5df-ace004227c0e/l_dpcpp-cpp-compiler_p_2023.2.1.8_offline.sh',
      'icx@2023.1.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/89283df8-c667-47b0-b7e1-c4573e37bd3e/l_dpcpp-cpp-compiler_p_2023.1.0.46347_offline.sh',
      'icx@2023.0.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/19123/l_dpcpp-cpp-compiler_p_2023.0.0.25393_offline.sh',
      'icx@2022.2.1': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/19030/l_dpcpp-cpp-compiler_p_2022.2.1.16991_offline.sh',

      ifx: 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/69f79888-2d6c-4b20-999e-e99d72af68d4/intel-fortran-compiler-2025.0.0.723_offline.sh',
      'ifx@2025.0.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/69f79888-2d6c-4b20-999e-e99d72af68d4/intel-fortran-compiler-2025.0.0.723_offline.sh',
      'ifx@2024.2.1': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/5e7b0f1c-6f25-4cc8-94d7-3a527e596739/l_fortran-compiler_p_2024.2.1.80_offline.sh',
      'ifx@2024.2.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/801143de-6c01-4181-9911-57e00fe40181/l_fortran-compiler_p_2024.2.0.426_offline.sh',
      'ifx@2024.1.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/fd9342bd-7d50-442c-a3e4-f41974e14396/l_fortran-compiler_p_2024.1.0.465_offline.sh',
      'ifx@2024.0.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/89b0fcf9-5c00-448a-93a1-5ee4078e008e/l_fortran-compiler_p_2024.0.0.49493_offline.sh',
      'ifx@2023.2.1': 'https://registrationcenter-download.intel.com/akdlm//IRC_NAS/0d65c8d4-f245-4756-80c4-6712b43cf835/l_fortran-compiler_p_2023.2.1.8_offline.sh',
      'ifx@2023.1.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/150e0430-63df-48a0-8469-ecebff0a1858/l_fortran-compiler_p_2023.1.0.46348_offline.sh',
      'ifx@2023.0.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/19105/l_fortran-compiler_p_2023.0.0.25394_offline.sh',
      'ifx@2022.2.1': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/18998/l_fortran-compiler_p_2022.2.1.16992_offline.sh',

      impi: 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/4b14b28c-2ca6-4559-a0ca-8a157627e0c8/intel-mpi-2021.14.0.791_offline.sh',
      'impi@2021.14.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/4b14b28c-2ca6-4559-a0ca-8a157627e0c8/intel-mpi-2021.14.0.791_offline.sh',
      'impi@2021.13.1': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/364c798c-4cad-4c01-82b5-e1edd1b476af/l_mpi_oneapi_p_2021.13.1.769_offline.sh',
      'impi@2021.13.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/9f84e1e8-11b2-4bd1-8512-3e3343585956/l_mpi_oneapi_p_2021.13.0.719_offline.sh',
      'impi@2021.12.1': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/56b2dd0e-954d-4330-b0a7-b22992f7e6b7/l_mpi_oneapi_p_2021.12.1.8_offline.sh',
      'impi@2021.12.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/749f02a5-acb8-4bbb-91db-501ff80d3f56/l_mpi_oneapi_p_2021.12.0.538_offline.sh',
      'impi@2021.11.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/2c45ede0-623c-4c8e-9e09-bed27d70fa33/l_mpi_oneapi_p_2021.11.0.49513_offline.sh',
      'impi@2021.10.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/4f5871da-0533-4f62-b563-905edfb2e9b7/l_mpi_oneapi_p_2021.10.0.49374_offline.sh',
      'impi@2021.9.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/718d6f8f-2546-4b36-b97b-bc58d5482ebf/l_mpi_oneapi_p_2021.9.0.43482_offline.sh',
      'impi@2021.8.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/19131/l_mpi_oneapi_p_2021.8.0.25329_offline.sh',
      'impi@2021.7.1': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/19010/l_mpi_oneapi_p_2021.7.1.16815_offline.sh',

      ipp: 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/acf220fa-326d-4f6e-9b63-f2da47b6f680/intel-ipp-2022.0.0.809_offline.sh',
      'ipp@2022.0.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/acf220fa-326d-4f6e-9b63-f2da47b6f680/intel-ipp-2022.0.0.809_offline.sh',
      'ipp@2021.12.1': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/7e07b203-af56-4b52-b69d-97680826a8df/l_ipp_oneapi_p_2021.12.1.16_offline.sh',
      'ipp@2021.12.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/ecc315bf-9e5a-4a23-b0ca-f58aea109e39/l_ipp_oneapi_p_2021.12.0.559_offline.sh',
      'ipp@2021.11.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/c8d09493-ca9b-45b1-b720-12b8719b4136/l_ipp_oneapi_p_2021.11.0.532_offline.sh',
      'ipp@2021.10.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/2d48c7d9-e716-4c73-8fe5-77a9599a405f/l_ipp_oneapi_p_2021.10.0.670_offline.sh',
      'ipp@2021.9.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/616a3fba-4ab6-4317-a17b-2be4b737fc37/l_ipp_oneapi_p_2021.9.0.49454_offline.sh',
      'ipp@2021.8.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/732392fa-41b3-4a92-935e-6a2b823162a7/l_ipp_oneapi_p_2021.8.0.46345_offline.sh',
      'ipp@2021.7.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/19126/l_ipp_oneapi_p_2021.7.0.25396_offline.sh',
      'ipp@2021.6.2': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/19007/l_ipp_oneapi_p_2021.6.2.16995_offline.sh',

      ippcp: 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/4592da40-6f1c-4d4b-aa5b-0bb97ec66c92/intel-cryptography-primitives-library-2025.0.0.616_offline.sh',
      'ippcp@2025.0.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/4592da40-6f1c-4d4b-aa5b-0bb97ec66c92/intel-cryptography-primitives-library-2025.0.0.616_offline.sh',
      'ippcp@2021.12.1': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/8d82c537-2756-4000-a6cf-d7fedbfb9499/l_ippcp_oneapi_p_2021.12.1.14_offline.sh',
      'ippcp@2021.12.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/16cce450-2d08-474f-a783-da6061bd8de9/l_ippcp_oneapi_p_2021.12.0.472_offline.sh',
      'ippcp@2021.11.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/a28fefdf-f67e-43a9-8e42-fcccd9da1fff/l_ippcp_oneapi_p_2021.11.0.37_offline.sh',
      'ippcp@2021.9.1': 'https://registrationcenter-download.intel.com/akdlm//IRC_NAS/76c4c136-5016-4a9e-8914-b164de007173/l_ippcp_oneapi_p_2021.9.1.9_offline.sh',
      'ippcp@2021.8.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/f488397a-bd8f-449f-9127-04de8426aa35/l_ippcp_oneapi_p_2021.8.0.49493_offline.sh',
      'ippcp@2021.7.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/3697d9d0-907f-40d4-a2a7-7d83c45b72cb/l_ippcp_oneapi_p_2021.7.0.43492_offline.sh',
      'ippcp@2021.6.3': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/19108/l_ippcp_oneapi_p_2021.6.3.25343_offline.sh',
      'ippcp@2021.6.2': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/18999/l_ippcp_oneapi_p_2021.6.2.15006_offline.sh',

      mkl: 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/79153e0f-74d7-45af-b8c2-258941adf58a/intel-onemkl-2025.0.0.940_offline.sh',
      'mkl@2025.0.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/79153e0f-74d7-45af-b8c2-258941adf58a/intel-onemkl-2025.0.0.940_offline.sh',
      'mkl@2024.2.2': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/89a381f6-f85d-4dda-ae62-30d51470f53c/l_onemkl_p_2024.2.2.17_offline.sh',
      'mkl@2024.2.1': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/6e00e368-b61d-4f87-a409-9b510c022a37/l_onemkl_p_2024.2.1.105_offline.sh',
      'mkl@2024.2.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/cdff21a5-6ac7-4b41-a7ec-351b5f9ce8fd/l_onemkl_p_2024.2.0.664_offline.sh',
      'mkl@2024.1.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/2f3a5785-1c41-4f65-a2f9-ddf9e0db3ea0/l_onemkl_p_2024.1.0.695_offline.sh',
      'mkl@2024.0.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/86d6a4c1-c998-4c6b-9fff-ca004e9f7455/l_onemkl_p_2024.0.0.49673_offline.sh',
      'mkl@2023.2.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/adb8a02c-4ee7-4882-97d6-a524150da358/l_onemkl_p_2023.2.0.49497_offline.sh',
      'mkl@2023.1.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/cd17b7fe-500e-4305-a89b-bd5b42bfd9f8/l_onemkl_p_2023.1.0.46342_offline.sh',
      'mkl@2023.0.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/19138/l_onemkl_p_2023.0.0.25398_offline.sh',
      'mkl@2022.2.1': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/19038/l_onemkl_p_2022.2.1.16993_offline.sh',

      tbb: 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/9d5f5bd1-6021-41f7-aa3e-36d44c4ac190/intel-onetbb-2022.0.0.403_offline.sh',
      'tbb@2022.0.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/9d5f5bd1-6021-41f7-aa3e-36d44c4ac190/intel-onetbb-2022.0.0.403_offline.sh',
      'tbb@2021.13.1': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/b9aad7b8-0a4c-4f95-a100-e0e2921d5777/l_tbb_oneapi_p_2021.13.1.15_offline.sh',
      'tbb@2021.13.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/d6b5327e-f2fd-4c90-966a-d7a0e1376686/l_tbb_oneapi_p_2021.13.0.629_offline.sh',
      'tbb@2021.12.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/b31f6b79-10aa-4119-a437-48fe2775633b/l_tbb_oneapi_p_2021.12.0.499_offline.sh',
      'tbb@2021.11.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/af3ad519-4c87-4534-87cb-5c7bda12754e/l_tbb_oneapi_p_2021.11.0.49527_offline.sh',
      'tbb@2021.10.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/c95cd995-586b-4688-b7e8-2d4485a1b5bf/l_tbb_oneapi_p_2021.10.0.49543_offline.sh',
      'tbb@2021.9.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/7dcd261b-12fa-418a-b61b-b3dd4d597466/l_tbb_oneapi_p_2021.9.0.43484_offline.sh',
      'tbb@2021.8.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/19143/l_tbb_oneapi_p_2021.8.0.25334_offline.sh',
      'tbb@2021.7.1': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/19041/l_tbb_oneapi_p_2021.7.1.15005_offline.sh'
    }
  }
}

const urls = configs.linux.urls

async function restoreCache (components) {
  const useCache = core.getBooleanInput('cache')
  if (!useCache) return false

  for (const component of components) {
    const url = urls[component]
    if (!url) {
      core.error(`Unknown oneapi component: ${component}`)
      process.exit(1)
    }
    key = key + ':' + path.parse(url).base
  }
  console.log(`Key ${key}`)

  console.log('Restoring from cache')
  const restoreKey = await cache.restoreCache(['/opt/intel/oneapi'], key)

  if (restoreKey) {
    console.log(`Restore succeeded: ${restoreKey}`)
    // clear key so we will not try to save
    key = ''
    return true
  } else {
    console.log(`Restore failed: ${restoreKey}`)
    return false
  }
}

async function prune () {
  if (!core.getBooleanInput('prune')) { return }

  const patterns = ['/opt/intel/oneapi/compiler/latest/opt/oclfpga',
    '/opt/intel/oneapi/mkl/latest/lib/*.a']

  console.log('Pruning oneapi install')
  await exec.exec('du', ['-sh', '/opt/intel/oneapi'])
  for (const pattern of patterns) {
    console.log(`  pattern: ${pattern}`)
    for (const path of glob.globSync(pattern)) {
      console.log(`    path: ${path}`)
      await exec.exec('sudo', ['rm', '-r', path])
    }
  }
  await exec.exec('du', ['-sh', '/opt/intel/oneapi'])
}

async function install (component) {
  const url = urls[component]
  console.log(`Installing ${component} from ${url}`)
  const installerPath = await tc.downloadTool(url)
  await exec.exec('sudo', ['bash', installerPath, '-s', '-a', '-s', '--action', 'install', '--eula', 'accept'])
  await io.rmRF(installerPath)
  await prune()
}

async function installList (components) {
  for (const component of components) {
    await install(component)
  }
}

function list () {
  if (!core.getBooleanInput('list')) { return }
  console.log('Available components:')
  for (const component in urls) {
    console.log(`  ${component}: ${urls[component]}`)
  }
}

function updateEnv () {
  // setvars.sh does not set CMAKE_PREFIX_PATH for MKL. It relies on
  // root install that puts links in /usr/local/lib/cmake?
  const name = 'CMAKE_PREFIX_PATH'
  let val = '/opt/intel/oneapi/mkl/latest/lib/cmake/mkl'
  if (name in process.env) {
    val = val + ':' + process.env[name]
  }
  core.exportVariable(name, val)
}

async function run () {
  try {
    list()
    updateEnv()
    const components = core.getMultilineInput('components')
    if (await restoreCache(components)) {
      return
    }
    await installList(components)
  } catch (error) {
    key = ''
    core.setFailed(error.message)
  }
  core.saveState('key', key)
}

run()
