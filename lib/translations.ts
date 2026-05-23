// lib/translations.ts

export const translations = {
  en: {
    nav: {
      home: 'Home',
      skills: 'Skills',
      experience: 'Experience',
      projects: 'Projects',
      contact: 'Contact',
      resume: 'Resume',
    },
    hero: {
      greeting: "Hi. I'm Tom Nguyen.",
      bio: 'Full Stack Developer & AI Engineer with 4+ years building and maintaining production applications - from clinical portals and enterprise platforms to mobile apps and LLM workflows. CS graduate from Cal State LA, specializing in scalable web architecture, automated solutions, and next-generation AI agents. Focused on delivering reliable software and clear technical guidance that drives real-world business value.',
      roles: ['Mendix Developer', 'Software Developer', 'AI Agent Developer', 'Full Stack Developer'],
      cta: { skills: 'My Skills', linkedin: 'LinkedIn', github: 'GitHub' },
    },
    skills: {
      heading: 'Skills',
      subheading: 'Technologies I work with',
      cards: [
        { title: 'AI & LLM Integration' },
        { title: 'Languages & Web' },
        { title: 'Frameworks' },
        { title: 'Databases & ORMs' },
        { title: 'Cloud & DevOps' },
        { title: 'Modern Infrastructure' },
      ],
    },
    experience: {
      heading: 'Experience',
      subheading: "Where I've worked",
      entries: [
        {
          bullets: [
            'Architect, develop, and maintain a clinical portal serving 30+ clinic staff, doctors, and 10+ attorney users, with 40+ feature updates and UI enhancements delivered in the last 3 months alone.',
            'Design and build staff-facing UIs using HTML, CSS/SASS, and JavaScript, translating complex clinical and legal workflows into intuitive interfaces for non-technical users.',
            'Manage and optimize a PostgreSQL database with 50+ entities, including adding indexes on consult queries to significantly improve calendar load performance in a HIPAA-sensitive environment.',
            'Integrate the Curogram SMS API for appointment communications, including a targeted fix to batch-send logic that prevents surveys from incorrectly triggering on past appointments.',
            'Serve as the primary technical liaison to Directors, gathering requirements, proposing multiple solutions, aligning on approach, and delivering implementations on clearly communicated timelines.',
          ],
        },
        {
          bullets: [
            'Developed and maintained a centralized billing portal across 8 locations, receiving SFTP-transmitted HL7 documents from radiology systems and translating them into structured Mendix data for clinical staff.',
            'Designed and maintained four company websites serving patients and referring physicians across 8 diagnostic imaging locations.',
            'Managed a PostgreSQL database with 20+ entities, maintaining data integrity, backup procedures, and query performance across a multi-location imaging operation.',
            'Integrated the EXA radiology information system via HL7 interface, enabling automated data transmission between external imaging systems and the internal Mendix portal.',
            'Detected a silent breaking change when EXA updated their HL7 format without notice. Identified missing data through proactive log monitoring, escalated immediately to the supervisor, and coordinated directly with EXA to adapt the integration and restore full data transmission.',
          ],
        },
        {
          bullets: [
            'Built and shipped multiple full-stack projects including an AI Flappy Bird (Neural Network + Genetic Algorithm built from scratch), a School Library Platform (Django/SQLite), and a Canvas drawing app, demonstrating rapid prototyping across diverse domains.',
            'Applied Reinforcement Learning and Neural Network concepts to train autonomous game agents using Genetic Algorithms, implementing the full learning pipeline from scratch.',
            'Developed and deployed full-stack web applications using Python, Django, HTML/CSS, JavaScript, and AWS, covering the full lifecycle from development to cloud production.',
          ],
        },
      ],
    },
    projects: {
      heading: 'Projects',
      subheading: "Things I've built",
      items: [
        {
          description: [
            'Real-time collaborative system architecture builder with AI assistance',
            'Interactive React Flow diagram editor with live cursors and presence avatars',
            'AI-powered design suggestions and auto-generated technical specs via Gemini',
          ],
        },
        {
          description: [
            'AI-powered language learning mobile app, a modern alternative to Duolingo',
            'Real-time audio calls with an AI teacher, live captioning and pronunciation feedback',
            'Supports 4 languages with 12 structured lessons and daily XP streak tracking',
          ],
        },
        {
          description: [
            'Rewrote basic HTML Flappy Bird into an AI-driven version',
            'Applied Reinforcement Learning and Neural Network concepts',
            'Implemented Genetic Algorithm for agent evolution',
          ],
        },
      ],
    },
    contact: {
      heading: "Let's Work Together",
      subheading: "Have a project in mind? I'd love to hear about it.",
      form: {
        namePlaceholder: 'Name',
        emailPlaceholder: 'Email',
        subjectPlaceholder: 'Subject',
        messagePlaceholder: 'Message',
        submit: 'Send Message',
        submitting: 'Sending…',
        successTitle: 'Message sent!',
        successBody: "Thanks for reaching out. I'll get back to you soon.",
        error: 'Something went wrong. Please try again or email me directly.',
      },
      orFindMe: 'Or find me on',
      footer: '© Tom Nguyen. All rights reserved.',
    },
  },
  vi: {
    nav: {
      home: 'Trang Chủ',
      skills: 'Kỹ Năng',
      experience: 'Kinh Nghiệm',
      projects: 'Dự Án',
      contact: 'Liên Hệ',
      resume: 'Hồ Sơ',
    },
    hero: {
      greeting: 'Xin chào. Tôi là Tom Nguyen.',
      bio: 'Lập trình viên Full Stack & Kỹ sư AI với hơn 4 năm kinh nghiệm xây dựng và duy trì các ứng dụng thực tế - từ cổng thông tin lâm sàng và nền tảng doanh nghiệp đến ứng dụng di động và quy trình LLM. Tốt nghiệp Khoa học Máy tính tại Cal State LA, chuyên về kiến trúc web có khả năng mở rộng, giải pháp tự động hóa và AI agent thế hệ mới. Tập trung vào việc cung cấp phần mềm đáng tin cậy và hướng dẫn kỹ thuật rõ ràng tạo ra giá trị thực tế.',
      roles: ['Lập Trình Viên Mendix', 'Lập Trình Viên Phần Mềm', 'Lập Trình Viên AI Agent', 'Lập Trình Viên Full Stack'],
      cta: { skills: 'Kỹ Năng Của Tôi', linkedin: 'LinkedIn', github: 'GitHub' },
    },
    skills: {
      heading: 'Kỹ Năng',
      subheading: 'Các công nghệ tôi làm việc',
      cards: [
        { title: 'Tích Hợp AI & LLM' },
        { title: 'Ngôn Ngữ & Web' },
        { title: 'Frameworks' },
        { title: 'Cơ Sở Dữ Liệu & ORM' },
        { title: 'Cloud & DevOps' },
        { title: 'Hạ Tầng Hiện Đại' },
      ],
    },
    experience: {
      heading: 'Kinh Nghiệm',
      subheading: 'Nơi tôi đã làm việc',
      entries: [
        {
          bullets: [
            'Thiết kế, phát triển và duy trì cổng thông tin lâm sàng phục vụ hơn 30 nhân viên phòng khám, bác sĩ và hơn 10 người dùng luật sư, với hơn 40 cập nhật tính năng và cải tiến giao diện trong 3 tháng qua.',
            'Thiết kế và xây dựng giao diện người dùng cho nhân viên bằng HTML, CSS/SASS và JavaScript, chuyển đổi quy trình lâm sàng và pháp lý phức tạp thành giao diện trực quan cho người dùng không chuyên kỹ thuật.',
            'Quản lý và tối ưu hóa cơ sở dữ liệu PostgreSQL với hơn 50 thực thể, bao gồm thêm chỉ mục cho các truy vấn tư vấn nhằm cải thiện đáng kể hiệu suất tải lịch trong môi trường tuân thủ HIPAA.',
            'Tích hợp API SMS Curogram cho thông báo cuộc hẹn, bao gồm sửa lỗi logic gửi hàng loạt ngăn khảo sát kích hoạt sai trên các cuộc hẹn trong quá khứ.',
            'Là đầu mối kỹ thuật chính với các Giám đốc, thu thập yêu cầu, đề xuất nhiều giải pháp, thống nhất hướng tiếp cận và triển khai đúng tiến độ đã thông báo.',
          ],
        },
        {
          bullets: [
            'Phát triển và duy trì cổng thanh toán tập trung cho 8 chi nhánh, nhận tài liệu HL7 qua SFTP từ hệ thống X-quang và chuyển đổi thành dữ liệu Mendix có cấu trúc cho nhân viên lâm sàng.',
            'Thiết kế và duy trì bốn website công ty phục vụ bệnh nhân và bác sĩ tuyến trong tại 8 địa điểm chẩn đoán hình ảnh.',
            'Quản lý cơ sở dữ liệu PostgreSQL với hơn 20 thực thể, duy trì tính toàn vẹn dữ liệu, quy trình sao lưu và hiệu suất truy vấn trên hoạt động nhiều địa điểm.',
            'Tích hợp hệ thống thông tin X-quang EXA qua giao diện HL7, cho phép truyền dữ liệu tự động giữa hệ thống hình ảnh bên ngoài và cổng Mendix nội bộ.',
            'Phát hiện thay đổi gây lỗi im lặng khi EXA cập nhật định dạng HL7 mà không thông báo. Xác định dữ liệu bị thiếu qua giám sát log chủ động, báo cáo ngay cho cấp trên và phối hợp trực tiếp với EXA để khôi phục toàn bộ quá trình truyền dữ liệu.',
          ],
        },
        {
          bullets: [
            'Xây dựng và ra mắt nhiều dự án full-stack bao gồm AI Flappy Bird (Neural Network + Genetic Algorithm tự viết), Nền tảng Thư viện Trường học (Django/SQLite) và ứng dụng vẽ Canvas, thể hiện khả năng tạo mẫu nhanh trên nhiều lĩnh vực.',
            'Áp dụng Reinforcement Learning và Neural Network để huấn luyện tác nhân game tự động bằng Genetic Algorithm, tự triển khai toàn bộ pipeline học từ đầu.',
            'Phát triển và triển khai các ứng dụng web full-stack sử dụng Python, Django, HTML/CSS, JavaScript và AWS, bao quát toàn bộ vòng đời từ phát triển đến sản xuất trên cloud.',
          ],
        },
      ],
    },
    projects: {
      heading: 'Dự Án',
      subheading: 'Những gì tôi đã xây dựng',
      items: [
        {
          description: [
            'Công cụ xây dựng kiến trúc hệ thống cộng tác thời gian thực với hỗ trợ AI',
            'Trình chỉnh sửa sơ đồ React Flow tương tác với con trỏ trực tiếp và avatar hiện diện',
            'Đề xuất thiết kế do AI hỗ trợ và tự động tạo thông số kỹ thuật qua Gemini',
          ],
        },
        {
          description: [
            'Ứng dụng di động học ngôn ngữ bằng AI - giải pháp thay thế hiện đại cho Duolingo',
            'Cuộc gọi âm thanh thời gian thực với giáo viên AI, chú thích trực tiếp và phản hồi phát âm',
            'Hỗ trợ 4 ngôn ngữ với 12 bài học có cấu trúc và theo dõi chuỗi XP hàng ngày',
          ],
        },
        {
          description: [
            'Viết lại Flappy Bird HTML cơ bản thành phiên bản điều khiển bởi AI',
            'Áp dụng các khái niệm Reinforcement Learning và Neural Network',
            'Triển khai Genetic Algorithm cho quá trình tiến hóa tác nhân',
          ],
        },
      ],
    },
    contact: {
      heading: 'Hãy Cùng Hợp Tác',
      subheading: 'Bạn có dự án trong đầu? Tôi rất muốn nghe.',
      form: {
        namePlaceholder: 'Họ Tên',
        emailPlaceholder: 'Email',
        subjectPlaceholder: 'Tiêu Đề',
        messagePlaceholder: 'Tin Nhắn',
        submit: 'Gửi Tin Nhắn',
        submitting: 'Đang gửi…',
        successTitle: 'Tin nhắn đã được gửi!',
        successBody: 'Tôi sẽ phản hồi sớm.',
        error: 'Đã có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ qua email.',
      },
      orFindMe: 'Hoặc tìm tôi trên',
      footer: '© Tom Nguyen. Bảo lưu mọi quyền.',
    },
  },
} as const;

export type Translations = typeof translations.en;
