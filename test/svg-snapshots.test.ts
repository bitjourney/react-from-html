import "tsconfig-paths/register";
import renderer from "react-test-renderer";
import { ReactFromHtml } from "./entrypoint";
import fs from "fs";

describe("ReactFromHtml#parse", () => {
  const reactFromHtml = new ReactFromHtml();

  it("renders an SVG with style attributes", () => {
    const tree = renderer
      .create(
        reactFromHtml.parseToFragment(`
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="60" height="60">
            <rect width="60" height="60"/>
            <text text-anchor="middle" alignment-baseline="central" x="30" y="30" style="font-size: 15;fill: #327ac2;">Hello, world!</text>
          </svg>
        `)
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders a simple SVG", () => {
    // this SVG comes from https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Getting_Started
    const tree = renderer
      .create(
        reactFromHtml.parseToFragment(`
          <svg version="1.1"
            baseProfile="full"
            width="300" height="200"
            xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="red" />
            <circle cx="150" cy="100" r="80" fill="green" />
            <text x="150" y="125" font-size="60" text-anchor="middle" fill="white">SVG</text>
          </svg>
          `)
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders an SVG with style attributes", () => {
    // this SVG comes from https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Other_content_in_SVG
    const tree = renderer
      .create(
        reactFromHtml.parseToFragment(`
          <svg version="1.1"
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
              width="200" height="200">
            <image x="90" y="-65" width="128" height="146" transform="rotate(45)"
                xlink:href="https://developer.mozilla.org/media/img/mdn-logo.png"/>
         </svg>
        `)
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  const svgDirname = `${__dirname}/../node_modules/payment-icons/svg/flat`;
  fs.readdirSync(svgDirname)
    .filter(basename => {
      return /\.svg$/.test(basename);
    })
    .forEach(basename => {
      it(`renders a real-world SVG (${basename}) copied from ${svgDirname}`, () => {
        const svg = fs.readFileSync(`${svgDirname}/${basename}`);
        const tree = renderer
          .create(reactFromHtml.parseToFragment(svg))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
});
