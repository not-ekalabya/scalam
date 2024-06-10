'use client'
import * as React from 'react';
import Compiler from '@/components/Compiler';

export default function Editor() {

  const [data, setData] = React.useState<any>({
    "title": "About",
    "write": true,
    "content": [
      {
        "title": "Hey, It's Ekalabya",
        "image": "https://i.pinimg.com/originals/a2/d9/01/a2d901aa209df00d993291024ddc6c2d.gif",
        "content": [
          {
            "id": 0,
            "value": null
          },
          {
            "id": 1,
            "value": null
          },
          {
            "type": "two-segment",
            "value": [
              {
                "type": "list",
                "value": [
                  {
                    "type": "image-snippit",
                    "value": "https://www.simpleimageresizer.com/_uploads/photos/098ce264/DP_1_350x350.png"
                  },
                  {
                    "style": {
                      "background": "blue-800"
                    },
                    "type": "text-block",
                    "title": "What am doing...",
                    "value": "📌 Developing Scalam\n📌 Learning about neural networks\n📌 Researching for ISEF\n📌 Trying to do non-profit service for talented people ( scalam is the first step ) #righttoinfo"
                  },
                  {
                    "type": "image-snippit",
                    "value": "https://media4.giphy.com/media/KXsvg55O7PnyW0OesS/giphy.gif?cid=6c09b952274uod3dm352h4q0xw5eoopbrcuffmsaj72271vj&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
                  }
                ],
                "style": {
                  "background": null,
                  "style": "none"
                }
              },
              {
                "type": "list",
                "value": [
                  {
                    "style": {
                      "background": "bg-gray-900/40"
                    },
                    "type": "text-block",
                    "title": "Life Stats 📊📈",
                    "value": "Name: Ekalabya Ghosh\nBirthday: 10 May 2010\nNationality: Indian\n\nHere's What I live for 👇👇"
                  },
                  {
                    "type": "image-block",
                    "style": {
                      "background": "green-800"
                    },
                    "title": "AI - Neural Networks and Generative",
                    "value": "Neural Networks are beautiful. They Can make humans seem dumb ( especially the person who is learning)",
                    "image": "https://miro.medium.com/v2/resize:fit:1400/1*BIpRgx5FsEMhr1k2EqBKFg.gif"
                  },
                  {
                    "style": {
                      "background": null
                    },
                    "type": "text-block",
                    "title": "Programming",
                    "value": "I have loved programming since child-hood. My best project is the Scalam Editor."
                  },
                  {
                    "style": {
                      "background": null
                    },
                    "type": "text-block",
                    "title": "Physics",
                    "value": "Physics is my beloved subject in school. I am a fan of Quantam Mechanics even though it goes way over my head 🙄🤯"
                  },
                  {
                    "style": {
                      "background": null
                    },
                    "type": "text-block",
                    "title": "Mathematics",
                    "value": "Anyone loving AI is bound to love maths. Mathematics is the base of AI... I realized that the hard way 😅"
                  }
                ],
                "style": {
                  "background": null,
                  "style": "none"
                }
              }
            ]
          }
        ],
        "write": false
      },
      {
        "title": "Check the DEMO",
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

  React.useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <main suppressHydrationWarning suppressContentEditableWarning>
      <Compiler data={data} onSave={(data: any) => { setData(data) }} />
    </main>
  );

}
