import React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import { LuCircleDollarSign, LuMapPin, LuPenLine } from 'react-icons/lu'

const FormTimTro = (props) => {
  const { onChangeValue } = props

  return (
    <Box component="form" autoComplete="off">
      <TextField
        id="Dang_Bai_Tim_Tro_ViTri"
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
      <TextField
        id="Dang_Bai_Tim_Tro_Gia"
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
        id="Dang_Bai_Tim_Tro_YeuCau"
        label="Yêu cầu thêm"
        placeholder="Mô tả chi tiết yêu cầu về nhà ở/phòng trọ cần thuê..."
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
      {/* End: Nội quy thuê phòng */}
    </Box>
  )
}

FormTimTro.propTypes = {}

export default FormTimTro
