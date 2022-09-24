import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';
import Button from '@mui/joy/Button';

export function Test() {
  return (
    <Box>
      <Button variant="solid">Solid</Button>
      <Button variant="soft">Soft</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="plain">Plain</Button>
      <Checkbox label="Hello world!" />
      <Select defaultValue="dog">
        <Option value="dog">Dog</Option>
        <Option value="cat">Cat</Option>
      </Select>
    </Box>
  );
}
