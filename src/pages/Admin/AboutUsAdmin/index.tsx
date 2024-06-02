import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Box, Container, Typography } from "@mui/material";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { STYLES } from "../../../config";
import { usePreLoginState } from "../../../hooks";
import { addUpdateAbout, getAbout } from "../../../services/About";
import { createSignal } from "../../../utils";
import { Button } from "../../../components";

const AboutUsAdmin = () => {
  const { state: { about }, dispatch } = usePreLoginState();
  const [aboutData, setAbout] = useState<any>(about);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { signal, controller } = createSignal();
    (async () => {
      const { data, error } = await getAbout(signal);
      if(data?.abort) return;
      if (!error) {
        dispatch("SET_ABOUT", data);
      }
    })();

    return () => controller.abort();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(()=>{
    setAbout(about)
  },[about])

  const setAboutData = async () => {
    setLoading(true);
    const { about, id } = aboutData;
    const { signal } = createSignal();
    const { data, error } = await addUpdateAbout({ about, id }, signal);
    if (!error) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <Box sx={{ bgcolor: "background.paper", mx: 2, p: 2 }}>
        <Typography component="div" sx={{ fontSize: 30, fontWeight: 600 }}>
          About Us
        </Typography>
      </Box>
      <Box
        sx={{
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
          mx: 2,
          p: 2,
          mt: 2,
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
          Modify About Us Content
        </Typography>
        <Container maxWidth="lg">
          <CKEditor
            editor={Editor}
            data={aboutData?.about}
            onReady={(editor: any) => {
              // You can store the "editor" and use when it is needed.
              editor.editing.view.change((writer: any) => {
                writer.setStyle(
                  "height",
                  "600px",
                  editor.editing.view.document.getRoot()
                );
              });
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setAbout({ ...aboutData, about: data });
            }}
          />
          <Button
            disabled={loading}
            onClick={setAboutData}
            sx={{ ...STYLES.button, mt: 1, ":hover": { ...STYLES.button } }}
            variant="contained"
            size="large"
          >
            Update About
          </Button>
        </Container>
      </Box>
    </div>
  );
};

export default AboutUsAdmin;
