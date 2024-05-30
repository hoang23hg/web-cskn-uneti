import React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import {
  LuCircleDollarSign,
  LuListChecks,
  LuMapPin,
  LuPenLine,
  LuPhone,
  LuPieChart,
  LuUsers,
  LuWarehouse,
} from 'react-icons/lu'

const FormChoThueTro = (props) => {
  const { onChangeValue } = props

  return (
    <Box component="form" autoComplete="off">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <TextField
            id="Dang_Bai_Cho_Thue_ViTri"
            label="Vị trí nhà ở/phòng trọ"
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
          {/* End: Vị trí nhà ở/phòng trọ */}
        </div>
        <TextField
          id="Dang_Bai_Cho_Thue_DienTich"
          label="Diện tích (m2)"
          variant="outlined"
          size="small"
          margin="normal"
          required
          fullWidth
          placeholder=""
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LuPieChart />
              </InputAdornment>
            ),
          }}
          onChange={onChangeValue}
        />
        {/* End: Diện tích */}
        <TextField
          id="Dang_Bai_Cho_Thue_TinhTrang"
          label="Tình trạng"
          variant="outlined"
          size="small"
          margin="normal"
          required
          fullWidth
          placeholder=""
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LuListChecks />
              </InputAdornment>
            ),
          }}
          onChange={onChangeValue}
        />
        {/* End: Tình trạng */}
        <TextField
          id="Dang_Bai_Cho_Thue_Gia"
          label="Giá thuê"
          variant="outlined"
          size="small"
          margin="normal"
          type="number"
          defaultValue={0}
          required
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LuCircleDollarSign />
              </InputAdornment>
            ),
          }}
          onChange={onChangeValue}
        />
        {/* End: Giá thuê*/}
        <TextField
          id="Dang_Bai_Cho_Thue_DienNuoc"
          label="Giá điện nước"
          variant="outlined"
          size="small"
          margin="normal"
          type="number"
          defaultValue={0}
          required
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LuCircleDollarSign />
              </InputAdornment>
            ),
          }}
          onChange={onChangeValue}
        />
        {/* End: Giá điện nước*/}
        <TextField
          id="Dang_Bai_Cho_Thue_NoiThatAnNinh"
          label="Nội thất, an ninh"
          variant="outlined"
          size="small"
          margin="normal"
          required
          fullWidth
          placeholder="Thông tin về nội thất, an ninh"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LuWarehouse />
              </InputAdornment>
            ),
          }}
          onChange={onChangeValue}
        />
        {/* End: Nội thất, an ninh */}
        <TextField
          id="Dang_Bai_Cho_Thue_DoiTuong"
          label="Đối tượng"
          variant="outlined"
          size="small"
          margin="normal"
          required
          fullWidth
          placeholder="Đối tượng được phép thuê"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LuUsers />
              </InputAdornment>
            ),
          }}
          onChange={onChangeValue}
        />
        {/* End: Đối tượng được phép thuê */}
        <TextField
          id="Dang_Bai_Cho_Thue_LienHe"
          label="Thông tin liên hệ"
          variant="outlined"
          size="small"
          margin="normal"
          type="tel"
          placeholder="Số điện thoại"
          required
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LuPhone />
              </InputAdornment>
            ),
          }}
          onChange={onChangeValue}
        />
        {/* End: Liên hệ */}
        <div className="col-span-2">
          <TextField
            id="Dang_Bai_Cho_Thue_NoiQuy"
            label="Nội quy thuê phòng"
            placeholder="Mô tả chi tiết nội quy/quy định..."
            multiline
            fullWidth
            rows={4}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LuPenLine />
                </InputAdornment>
              ),
            }}
            onChange={onChangeValue}
          />
          {/* End: Nội quy thuê phòng */}
        </div>
      </div>
    </Box>
  )
}

FormChoThueTro.propTypes = {}

export default FormChoThueTro
