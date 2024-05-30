import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import {
  LuCalendarDays,
  LuComputer,
  LuHome,
  LuPenLine,
  LuUser2,
} from 'react-icons/lu'

const currencies = [
  {
    value: 'Khoa học công nghệ',
    label: 'Khoa học công nghệ',
  },
  {
    value: 'Lập trình',
    label: 'Lập trình',
  },
  {
    value: 'Kế toán',
    label: 'Kế toán',
  },
  {
    value: 'Đề cương',
    label: 'Đề cương',
  },
]

function FormDangBaiTLHT(props) {
  const { onChangeValue } = props
  return (
    <Box component="form" autoComplete="off">
      <TextField
        id="Dang_Bai_TaiLieuHocTap_TheLoai"
        name="Dang_Bai_TaiLieuHocTap_TheLoai"
        select
        label="Thể loại"
        defaultValue="Khoa học công nghệ"
        required
        fullWidth
        size="small"
        margin="normal"
        onChange={onChangeValue}
      >
        {currencies.map((option) => (
          <MenuItem
            key={option.value}
            name="Dang_Bai_TaiLieuHocTap_TheLoai"
            value={option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      {/* End: Select Thể loại */}
      <TextField
        id="Dang_Bai_TaiLieuHocTap_TacGia"
        label="Tác giả"
        variant="outlined"
        size="small"
        margin="normal"
        required
        fullWidth
        placeholder="Họ và tên của tác giả"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LuUser2 />
            </InputAdornment>
          ),
        }}
        onChange={onChangeValue}
      />
      {/* End: Tác giả */}
      <TextField
        id="Dang_Bai_TaiLieuHocTap_Khoa"
        label="Khoa"
        variant="outlined"
        size="small"
        margin="normal"
        required
        fullWidth
        placeholder="Tài liệu thuộc khoa nào?"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LuHome />
            </InputAdornment>
          ),
        }}
        onChange={onChangeValue}
      />
      {/* End: Khoa */}
      <TextField
        id="Dang_Bai_TaiLieuHocTap_Nganh"
        label="Ngành"
        variant="outlined"
        size="small"
        margin="normal"
        required
        fullWidth
        placeholder="Tài liệu thuộc ngành học gì?"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LuComputer />
            </InputAdornment>
          ),
        }}
        onChange={onChangeValue}
      />
      {/* End: Ngành */}
      <TextField
        id="Dang_Bai_TaiLieuHocTap_NamXuatBan"
        label="Năm xuất bản"
        variant="outlined"
        size="small"
        margin="normal"
        required
        fullWidth
        placeholder="Năm xuất bản là năm bao nhiêu?"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LuCalendarDays />
            </InputAdornment>
          ),
        }}
        onChange={onChangeValue}
      />
      {/* End: Năm xuất bản */}
      <TextField
        id="Dang_Bai_TaiLieuHocTap_NoiDung"
        label="Thông tin thêm về tài liệu"
        placeholder="Mô tả thêm thông tin..."
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
      {/* End: Tác giả */}
    </Box>
  )
}

export default FormDangBaiTLHT
