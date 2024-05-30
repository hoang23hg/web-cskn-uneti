import React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import { LuMapPin, LuPenLine } from 'react-icons/lu'

const currencies = [
  {
    value: 'Đồ dùng cá nhân',
    label: 'Đồ dùng cá nhân',
  },
  {
    value: 'Vệ sinh cá nhân',
    label: 'Vệ sinh cá nhân',
  },
  {
    value: 'Đồ dùng nấu ăn',
    label: 'Đồ dùng nấu ăn',
  },
  {
    value: 'Khác',
    label: 'Khác',
  },
]

const FormDangBaiDDCN = (props) => {
  const { onChangeValue } = props
  return (
    <Box component="form" autoComplete="off">
      <TextField
        id="Dang_Bai_SP_DoDungCaNhan_Loai"
        name="Dang_Bai_SP_DoDungCaNhan_Loai"
        select
        label="Loại sản phẩm"
        defaultValue="Đồ dùng cá nhân"
        required
        fullWidth
        size="small"
        margin="normal"
        onChange={onChangeValue}
      >
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      {/* End: Select Loại sản phẩm */}
      <TextField
        id="Dang_Bai_SP_DoDungCaNhan_DiaChi"
        label="Địa chỉ"
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
      {/* End: Địa chỉ */}
      <TextField
        id="Dang_Bai_SP_DoDungCaNhan_NoiDung"
        label="Thông tin sản phẩm"
        placeholder="Mô tả chi tiết về sản phẩm..."
        multiline
        fullWidth
        required
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
      {/* End: Thông tin sản phẩm */}
    </Box>
  )
}

FormDangBaiDDCN.propTypes = {}

export default FormDangBaiDDCN
