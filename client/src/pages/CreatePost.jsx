import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils'; 
import { FormField, Loader } from '../components';

import styles from './CreatePostCSS.js';

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:3000/api/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();

        setForm({ ...form, photo: data.photo });
      } catch (err) {
        alert(err.message);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide a proper prompt');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3000/api/post', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        alert('Success');
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };

  return (
    <section className={styles.container}>
      <div>
        <h1 className={styles.heading}>Create</h1>
        <p className={styles.description}>
          Generate an imaginative image through DALL-E AI and share it with the community
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formFields}>
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Wasfa Parwez"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className={styles.imagePreview}>
            { form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className={styles.image}
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className={styles.previewImage}
              />
            )}

            {generatingImg && (
              <div className={styles.overlay}>
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className={styles.buttons}>
          <button
            type="button"
            onClick={generateImage}
            className={styles.generateButton}
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className={styles.shareSection}>
          <p className={styles.shareText}>
            ** Once you have created the image you want, you can share it with others in the community **
          </p>
          <button
            type="submit"
            className={styles.shareButton}
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
