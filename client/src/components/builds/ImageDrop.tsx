import { Fragment, Dispatch, SetStateAction } from 'react';
import { Group, Text, useMantineTheme, MantineTheme, Image, Indicator } from '@mantine/core';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { Upload, Photo, X, Icon as TablerIcon } from 'tabler-icons-react';

interface CustomFile extends File {
  preview : string
}

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
    : status.rejected
    ? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
    : theme.colorScheme === 'dark'
    ? theme.colors.dark[0]
    : theme.colors.gray[7];
}

function ImageUploadIcon({
  status,
  ...props
}: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) {
  if (status.accepted) {
    return <Upload {...props} />;
  }

  if (status.rejected) {
    return <X {...props} />;
  }

  return <Photo {...props} />;
}

export const dropzoneChildren = (status: DropzoneStatus, theme: MantineTheme) => (
  <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
    <ImageUploadIcon status={status} style={{ color: getIconColor(status, theme) }} size={80} />

    <div>
      <Text size="xl" inline>
        Drag images here or click to select files
      </Text>
      <Text size="sm" color="dimmed" inline mt={7}>
        Attach as many files as you like, each file should not exceed 5mb
      </Text>
    </div>
  </Group>
);

type Props = {
  form: any // TODO create a type for the form object
  fileList?: any[]
  setFileList?: Dispatch<SetStateAction<any[]>>
}

function ImageDrop({ form, fileList, setFileList } : Props) {
  const theme = useMantineTheme();

  const handleImageDrop = (imgs : File[]) => {
    console.log(imgs);
    const newImageList = imgs.map(img => 
      Object.assign(img, {
        preview: URL.createObjectURL(img)
      })
    )
    setFileList!([...fileList!, ...newImageList]);
  };

  const removeFile = (id : string) => {
    const newFileList = fileList!.filter(file => file.name !== id);
    if(setFileList) setFileList(newFileList);
  };

  return (
    <Fragment>
      <Dropzone
        onDrop={handleImageDrop}
        onReject={(files) => console.log('rejected files', files)}
        accept={IMAGE_MIME_TYPE}
      >
        {(status) => dropzoneChildren(status, theme)}
      </Dropzone>
      <Group>
        {fileList && fileList.map((file: CustomFile) => 
          <Indicator
            inline
            label={<X size={10}/>}
            size={16}
            zIndex={100}
            onClick={(e) => {
              e.stopPropagation();
              removeFile(file.name);
            }}
            key={file.name}
          >
            <Image src={file.preview} alt={file.name} sx={{maxWidth: '6rem'}} />
          </Indicator>
        )}
      </Group>
    </Fragment>
  );
}

export default ImageDrop;