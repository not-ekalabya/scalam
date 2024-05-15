'use client'
import * as React from 'react';
import Compiler from '@/components/Compiler';

export default function Editor() {
  
  const [data, setData] = React.useState<any>({
    "title": "Experimental 4.0",
    "write": true,
    "content": [
      {
        "title": "Unit 1.0.0 - Getting Abord with Scalam",
        "image": "https://i.pinimg.com/originals/a2/d9/01/a2d901aa209df00d993291024ddc6c2d.gif",
        "content": [
          {
            "id": 0,
            "style": {
              "background": "red-800"
            },
            "type": "text-block",
            "title": "Introduction",
            "value": "Welcome to Scalam 👋, your go-to platform for revolutionizing education and course creation! Scalam is more than just another online learning platform - it's the YouTube for courses and education. Our mission is to empower tutors and educators to digitize their knowledge and reach a global audience, while providing students with a seamless learning experience. With Scalam, tutors can easily create and monetize courses through various means such as ads, one-time fees, or monthly subscriptions.\n\nAt Scalam, we believe in simplifying the course creation process once and for all. Our user-friendly interface allows tutors to effortlessly upload videos from any video hosting service, whether it's Vimeo, YouTube, Loom, and more. Additionally, tutors can enrich their courses by including written content, ensuring that students have access to comprehensive learning materials. With Scalam, tutors can expand their reach, attract more students, and monetize their expertise in a hassle-free manner.\n\nJoin us on Scalam and be a part of the education revolution! Whether you're a tutor looking to share your knowledge or a student eager to learn, Scalam offers a dynamic platform where education knows no bounds. Discover, learn, and grow with Scalam today 👍👍"
          },
          {
            "type": "two-segment",
            "value": [
              {
                "type": "list",
                "value": [
                  {
                    "type": "video-snippit",
                    "style": {
                      "background": null
                    },
                    "value": "<iframe width=\"853\" height=\"480\" src=\"https://www.youtube.com/embed/JTxsNm9IdYU\" title=\"ChatGPT Tutorial - A Crash Course on Chat GPT for Beginners\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen></iframe>"
                  },
                  {
                    "type": "image-snippit",
                    "value": "https://media4.giphy.com/media/OcbCi4OcPuqPTHCLR0/source.gif"
                  }
                ],
                "style": {
                  "background": null,
                  "style": "number"
                }
              },
              {
                "type": "list",
                "value": [
                  {
                    "style": {
                      "background": null
                    },
                    "type": "text-block",
                    "title": "Course Creation",
                    "value": "Course Creation is easier than ever in Scalam. Write some points of lesson in the Text Blocks just as you saw in the Introductory Text.  To give some extra importance to a specific block use the Toolbar to assign some themes.\n\nNow, maybe you need some diagrams to demonstrate scientific processes or marketing funnels. No worries, We got that covered. Add an Image snippet or a dedicated Image block for intuitive learning. \n\nThat's cool, but videos can make you stand out from the competition. Add videos from a video hosting service by using the video snippet feature. You could even try giving a new dimensions to your pages by using layout features like the List or the Two Segment Display just like the ones you are reading. This is just the beginning new features are coming soon!"
                  },
                  {
                    "type": "image-block",
                    "style": {
                      "background": null,
                      "default": "col"
                    },
                    "title": "Monitization",
                    "value": "Scalam offers multiple monetization options to help tutors maximize their earnings. Tutors can choose from various revenue streams such as ads, one-time fees, or monthly subscriptions, depending on their preferences and business model. Our platform provides transparent monetization tools and analytics, enabling tutors to track their earnings and optimize their revenue strategies effectively. With Scalam, tutors can monetize their courses while maintaining full control over pricing, promotions, and audience engagement. Whether it's generating passive income through ads or offering exclusive content to subscribers, Scalam empowers tutors to unlock their earning potential and thrive in the digital education landscape.",
                    "image": "https://raw.githubusercontent.com/gist/vininjr/d29bb07bdadb41e4b0923bc8fa748b1a/raw/88f20c9d749d756be63f22b09f3c4ac570bc5101/programming.gif"
                  }
                ],
                "style": {
                  "background": null,
                  "style": "bullet"
                }
              }
            ],
            "id": 1,
            "style": {
              "background": null
            }
          }
        ],
        "write": false
      },
      {
        "title": "Unit 2.0.0 - Demo Chapter",
        "checked": false,
        "image": "https://i.pinimg.com/originals/ed/a5/73/eda5739966cb33768d8ad0d77d7307ce.gif",
        "content": [
          {
            "value": null
          },
          {
            "value": null
          },
          {
            "style": {
              "background": "green-900"
            },
            "type": "text-block",
            "title": "Analyzing the Effects of Tectonic Plate Movement on Biodiversity Hotspots in Southeast Asia",
            "value": "The dynamic interplay between tectonic plate movement and biodiversity hotspots in Southeast Asia constitutes a fascinating field of scientific inquiry. As one of the most geologically active regions on Earth, Southeast Asia is characterized by a complex mosaic of tectonic boundaries, ranging from subduction zones to transform faults. These geological processes have profound implications for the region's topography, climate patterns, and ecological diversity. Against this backdrop, understanding the intricate relationship between tectonic dynamics and biodiversity hotspots holds significant importance for conservation efforts and ecosystem management in this biologically rich and environmentally sensitive region."
          },
          {
            "value": null
          },
          {
            "type": "two-segment",
            "value": [
              {
                "type": "list",
                "value": [
                  {
                    "type": "video-snippit",
                    "style": {
                      "background": null
                    },
                    "value": "<iframe width=\"853\" height=\"480\" src=\"https://www.youtube.com/embed/RaQBaVeEbW8\" title=\"What is a biodiversity hotspot?\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen></iframe>"
                  },
                  {
                    "style": {
                      "background": "red-900"
                    },
                    "type": "text-block",
                    "title": " Tectonic Plate Influence on Biodiversity Hotspots",
                    "value": "The shifting of tectonic plates in Southeast Asia shapes the region's diverse landscapes, including mountains, valleys, and islands. These varied habitats contribute to the formation of biodiversity hotspots, where high species richness and endemism are concentrated. Understanding the relationship between tectonic activity and biodiversity hotspots is essential for conservation efforts and understanding evolutionary processes."
                  }
                ],
                "style": {
                  "background": null,
                  "style": "number"
                }
              },
              {
                "type": "image-block",
                "style": {
                  "background": "indigo-800",
                  "default": "col"
                },
                "title": "Tectonic Impacts on Ecosystem Dynamics",
                "value": "Tectonic processes such as mountain building, volcanic activity, and sea level changes significantly impact ecosystem dynamics in Southeast Asia. For instance, mountain uplift creates isolated habitats, leading to speciation and unique flora and fauna. Volcanic eruptions can disrupt ecosystems but also enrich soils, fostering the establishment of new vegetation communities. Additionally, sea level changes alter coastal habitats, affecting marine biodiversity and coastal ecosystems. Studying these impacts provides insights into ecosystem responses to geological processes and informs management strategies amidst ongoing tectonic activity.",
                "image": "https://i.imgur.com/mtNEDkP.gif"
              }
            ]
          }
        ]
      }
    ]
  })

  return (
    <main suppressHydrationWarning suppressContentEditableWarning>
      <Compiler data={data} onSave={(data: any) => { setData(data) }} />
    </main>
  );

}
