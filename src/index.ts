import express, { Request, Response, NextFunction } from "express";
const app = express();
import 'dotenv/config'
import cors from "cors";
import helmet from "helmet";
import * as yup from "yup";
import { nanoid } from "nanoid";
import links from './db';


const port = process.env.PORT || 8080;



app.use(helmet());
app.use(cors());
app.use(express.json());

const longUrlSchema = yup.string().trim().url().required();
const baseUrl = process.env.baseUrl;


// Home
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to my URl Shortener!");
});

interface Links {
  longUrl: string,
  shortUrl: string,
  _id: string,
  slug: string
}


// Shorten URL
app.post("/shorten", async (req: Request, res: Response, next: NextFunction) => {
  const { longUrl } = req.body;

  try {
    await longUrlSchema.validate(longUrl);
    const checkIfExists: Links = await links.findOne({ longUrl });
    if (checkIfExists) {
      return res.json(checkIfExists.shortUrl)
    } else {
      const slug = nanoid(5).toLowerCase();
      const shortUrl = baseUrl + '/' + slug;
      const added: Links = await links.insert({ shortUrl, slug, longUrl });
      res.json(added.shortUrl);
    }
  } catch (error) {
    next(error);
  }
})

// Visit link for site
app.get("/:code", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const url: Links = await links.findOne({
      slug: req.params.code
    })
    if (url) {
      return res.redirect(url.longUrl)
    } else {
      return res.status(404).json('URL does not exist')
    }
  } catch (error) {
    next(error)
  }
});



app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    res.status(400).send({ msg: "Invalid Request", code: err.message });
  } else {
    next();
  }
});


app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
