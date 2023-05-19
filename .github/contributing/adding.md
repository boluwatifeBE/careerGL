## How to add Content

To add content to existing Career Guidelines, please, follow the steps below:

### For Developers

- Visit any of the [career guides](https://careergl.vercel.app/).
- Click any of the nodes on the career guides and a drawer will open showing the content for the specific guides node clicked.
- Click the button "Edit this Page" and add the content for the roadmap node by following the guidelines listed below and open a Pull Request.

Please note that the markdown should be in the (.mdx) extension, and it has a specific format. Kindly follow the [sample format for markdown as given here](https://raw.githubusercontent.com/boluwatifeBE/careerGL/main/data/careers/music/production/content/100-music-theory/100-basics.mdx).

- Title of the file to represent the node item.
- Add a summary describing the roadmap node (preferably less than 200 characters)
- Use the ResourceGroupTitle tag for the resources heading

```
<ResourceGroupTitle>Free Content</ResourceGroupTitle>
```

- Use BadgeLink tag for the resource links with the below guidelines

```
<!-- blue color scheme for the official websites and documentation -->
<BadgeLink colorScheme='blue' badgeText='Official Website' href='https://reactjs.org/'>React Website</BadgeLink>

<!-- green color scheme for the courses -->
<BadgeLink badgeText='Course' colorScheme='green' href='https://example.com'>The Beginner's Guide to React</BadgeLink>

<!-- no color scheme for the video links -->
<BadgeLink badgeText='Watch' href='https://www.youtube.com/watch?v=t9Mo-bkl4ko'>Elements of Music</BadgeLink>

<!-- yellow color scheme for the blog posts and readable text -->
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.musicgateway.com/blog/how-to/chord-music-theory'>Chord Music Theory</BadgeLink>
```

### For None Developers

- Visit any of the [career guides](https://careergl.vercel.app/).
- Click any of the nodes on the career guides and a drawer will open showing the content for the specific guides node clicked.

etc
