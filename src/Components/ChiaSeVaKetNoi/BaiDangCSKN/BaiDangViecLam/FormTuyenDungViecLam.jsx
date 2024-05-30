import React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import {
  LuArrowUp10,
  LuArrowUpAZ,
  LuBuilding2,
  LuCircleDollarSign,
  LuCreditCard,
  LuListChecks,
  LuMapPin,
  LuPenLine,
  LuPhone,
  LuPieChart,
  LuUserCog,
  LuUsers,
  LuWarehouse,
} from 'react-icons/lu'

const FormTuyenDungViecLam = (props) => {
  const { onChangeValue } = props
  return (
    <Box component="form" autoComplete="off">
      <div className="grid grid-cols-2 gap-1">
        <div className="col-span-2">
          <TextField
            id="Dang_Bai_ViecLam_TenCongTy"
            label="Tên công ty, doanh nghiệp, tổ chức"
            variant="outlined"
            size="small"
            margin="normal"
            required
            fullWidth
            placeholder=""
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LuBuilding2 />
                </InputAdornment>
              ),
            }}
            onChange={onChangeValue}
          />
          {/* End: Tên công ty, doanh nghiệp, tổ chức */}
        </div>
        <div className="col-span-2">
          <TextField
            id="Dang_Bai_ViecLam_DiaChi"
            label="Địa chỉ/Văn phòng làm việc"
            variant="outlined"
            size="small"
            margin="normal"
            required
            fullWidth
            placeholder=""
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LuMapPin />
                </InputAdornment>
              ),
            }}
            onChange={onChangeValue}
          />
          {/* End: Địa chỉ/Văn phòng làm việc */}
        </div>
        <div className="col-span-2 lg:col-span-1">
          <TextField
            id="Dang_Bai_ViecLam_ViTriTuyenDung"
            label="Vị trí tuyển dụng"
            variant="outlined"
            size="small"
            margin="normal"
            required
            fullWidth
            placeholder=""
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LuArrowUpAZ />
                </InputAdornment>
              ),
            }}
            onChange={onChangeValue}
          />
          {/* End: Vị trí tuyển dụng */}
        </div>
        <div className="col-span-2 lg:col-span-1">
          <TextField
            id="Dang_Bai_ViecLam_SoLuongTuyenDung"
            label="Số lượng tuyển dụng"
            variant="outlined"
            size="small"
            margin="normal"
            type="number"
            defaultValue={0}
            required
            fullWidth
            placeholder=""
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LuArrowUp10 />
                </InputAdornment>
              ),
            }}
            onChange={onChangeValue}
          />
          {/* End: Số lượng tuyển dụng */}
        </div>
        <div className="col-span-2 lg:col-span-1">
          <TextField
            id="Dang_Bai_ViecLam_ThuNhap"
            label="Mức thu nhập"
            variant="outlined"
            size="small"
            margin="normal"
            required
            fullWidth
            placeholder=""
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LuCircleDollarSign />
                </InputAdornment>
              ),
            }}
            onChange={onChangeValue}
          />
          {/* End: Mức thu nhập */}
        </div>
        <div className="col-span-2 lg:col-span-1">
          <TextField
            id="Dang_Bai_ViecLam_HinhThucLam"
            label="Hình thức làm việc"
            variant="outlined"
            size="small"
            margin="normal"
            required
            fullWidth
            placeholder=""
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LuUserCog />
                </InputAdornment>
              ),
            }}
            onChange={onChangeValue}
          />
          {/* End: Hình thức làm việc */}
        </div>
        <div className="col-span-2 md:col-span-1">
          <TextField
            id="Dang_Bai_ViecLam_HinhThucTraLuong"
            label="Hình thức trả lương"
            variant="outlined"
            size="small"
            margin="normal"
            required
            fullWidth
            placeholder=""
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LuCreditCard />
                </InputAdornment>
              ),
            }}
            onChange={onChangeValue}
          />
          {/* End: Hình thức trả lương */}
        </div>
        <div className="col-span-2 lg:col-span-1">
          <TextField
            id="Dang_Bai_ViecLam_LinhVuc"
            label="Lĩnh vực"
            variant="outlined"
            size="small"
            margin="normal"
            required
            fullWidth
            placeholder=""
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LuCircleDollarSign />
                </InputAdornment>
              ),
            }}
            onChange={onChangeValue}
          />
          {/* End: Lĩnh vực */}
        </div>
        <div className="col-span-2 lg:col-span-1">
          <TextField
            id="Dang_Bai_ViecLam_ThoiHanUngTuyen"
            label="Thời hạn ứng tuyển/nhận hồ sơ"
            variant="outlined"
            size="small"
            margin="normal"
            required
            fullWidth
            placeholder=""
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LuCircleDollarSign />
                </InputAdornment>
              ),
            }}
            onChange={onChangeValue}
          />
          {/* End: Thời hạn ứng tuyển/nhận hồ sơ */}
        </div>
        <div className="col-span-2 lg:col-span-1">
          <TextField
            id="Dang_Bai_ViecLam_CapBac"
            label="Cấp bậc làm việc"
            variant="outlined"
            size="small"
            margin="normal"
            required
            fullWidth
            placeholder=""
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LuCircleDollarSign />
                </InputAdornment>
              ),
            }}
            onChange={onChangeValue}
          />
          {/* End: Cấp bậc làm việc */}
        </div>
        <div className="col-span-2">
          <TextField
            id="Dang_Bai_ViecLam_CheDoDaiNgo"
            label="Chế độ đãi ngộ"
            variant="outlined"
            size="small"
            margin="normal"
            required
            fullWidth
            multiline
            minRows={2}
            onResize
            placeholder=""
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LuCircleDollarSign />
                </InputAdornment>
              ),
            }}
            onChange={onChangeValue}
          />
          {/* End: Chế độ đãi ngộ */}
        </div>
        <div className="col-span-2">
          <TextField
            id="Dang_Bai_ViecLam_CachThucLienHe"
            label="Cách thức liên hệ"
            variant="outlined"
            size="small"
            margin="normal"
            required
            fullWidth
            placeholder="Ví dụ: Liên hệ qua email: example@gmail.com hoặc hotline: 012548086"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LuCircleDollarSign />
                </InputAdornment>
              ),
            }}
            onChange={onChangeValue}
          />
          {/* End: Cách thức liên hệ */}
        </div>
        <div className="col-span-2">
          <TextField
            id="Dang_Bai_ViecLam_YeuCauCuaNhaTuyenDung"
            label="Yêu cầu của nhà tuyển dụng"
            variant="outlined"
            size="small"
            margin="normal"
            required
            fullWidth
            multiline
            minRows={2}
            onResize
            placeholder=""
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LuCircleDollarSign />
                </InputAdornment>
              ),
            }}
            onChange={onChangeValue}
          />
          {/* End: Yêu cầu của nhà tuyển dụng */}
        </div>
        <div className="col-span-2">
          <TextField
            id="Dang_Bai_ViecLam_NoiDung"
            label="Nội dung tuyển dụng"
            variant="outlined"
            size="small"
            margin="normal"
            multiline
            minRows={4}
            required
            fullWidth
            placeholder=""
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LuCircleDollarSign />
                </InputAdornment>
              ),
            }}
            onChange={onChangeValue}
          />
          {/* End: Nội dung tuyển dụng */}
        </div>
      </div>
    </Box>
  )
}

FormTuyenDungViecLam.propTypes = {}

export default FormTuyenDungViecLam
