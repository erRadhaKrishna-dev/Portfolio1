"""
Script to generate Resume PDF
Run this in Django shell: python manage.py shell < static/documents/create_resume.py
Or use: from reportlab.lib.pagesizes import letter
"""

try:
    from reportlab.lib.pagesizes import letter
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.units import inch
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
    from reportlab.lib import colors
    from datetime import datetime
    
    # Create PDF
    pdf_path = 'static/documents/Resume_Radha_Krishna.pdf'
    doc = SimpleDocTemplate(pdf_path, pagesize=letter, topMargin=0.5*inch, bottomMargin=0.5*inch)
    story = []
    styles = getSampleStyleSheet()
    
    # Title Style
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#0ef'),
        spaceAfter=6,
        alignment=1  # Center
    )
    
    # Heading Style
    heading_style = ParagraphStyle(
        'CustomHeading',
        parent=styles['Heading2'],
        fontSize=14,
        textColor=colors.HexColor('#0ef'),
        spaceAfter=6,
        spaceBefore=10
    )
    
    # Normal Style
    normal_style = ParagraphStyle(
        'CustomNormal',
        parent=styles['Normal'],
        fontSize=11,
        spaceAfter=4
    )
    
    # Add Title
    story.append(Paragraph("RADHA KRISHNA", title_style))
    story.append(Paragraph("Full Stack Developer", styles['Normal']))
    story.append(Spacer(1, 0.2*inch))
    
    # Contact Info
    contact_data = [
        ['Email: krish.ra10.20@gmail.com', 'Phone: +91 7524933468', 'Location: India']
    ]
    contact_table = Table(contact_data)
    contact_table.setStyle(TableStyle([
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
    ]))
    story.append(contact_table)
    story.append(Spacer(1, 0.3*inch))
    
    # Experience Section
    story.append(Paragraph("EXPERIENCE", heading_style))
    story.append(Paragraph("<b>Full Stack Developer</b> | Tech Company Inc.", normal_style))
    story.append(Paragraph("Jan 2023 - Present", normal_style))
    story.append(Paragraph("• Developed responsive web applications using HTML, CSS, JavaScript, and React", normal_style))
    story.append(Paragraph("• Built backend solutions with Python, Django, and SQL databases", normal_style))
    story.append(Paragraph("• Collaborated with cross-functional teams to deliver high-quality projects", normal_style))
    story.append(Paragraph("• Improved application performance by 40% through code optimization", normal_style))
    story.append(Spacer(1, 0.15*inch))
    
    story.append(Paragraph("<b>Web Developer Intern</b> | Creative Solutions Ltd.", normal_style))
    story.append(Paragraph("Jun 2022 - Dec 2022", normal_style))
    story.append(Paragraph("• Assisted in designing and developing 5+ client websites", normal_style))
    story.append(Paragraph("• Implemented responsive design principles across all projects", normal_style))
    story.append(Spacer(1, 0.2*inch))
    
    # Education Section
    story.append(Paragraph("EDUCATION", heading_style))
    story.append(Paragraph("<b>Bachelor of Science in Computer Science</b>", normal_style))
    story.append(Paragraph("University of Technology | 2020 - 2023", normal_style))
    story.append(Paragraph("CGPA: 8.5/10", normal_style))
    story.append(Spacer(1, 0.2*inch))
    
    # Skills Section
    story.append(Paragraph("TECHNICAL SKILLS", heading_style))
    story.append(Paragraph("<b>Frontend:</b> HTML5, CSS3, JavaScript, Bootstrap, React, Responsive Design", normal_style))
    story.append(Paragraph("<b>Backend:</b> Python, Django, Node.js, REST APIs, Server-side Development", normal_style))
    story.append(Paragraph("<b>Databases:</b> SQL, MySQL, PostgreSQL, Database Design, Query Optimization", normal_style))
    story.append(Paragraph("<b>Tools:</b> Git, GitHub, VS Code, Figma, UI/UX Design, Agile Methodology", normal_style))
    story.append(Spacer(1, 0.2*inch))
    
    # Certifications
    story.append(Paragraph("CERTIFICATIONS", heading_style))
    story.append(Paragraph("• Full Stack Web Development Certification - Udemy (2023)", normal_style))
    story.append(Paragraph("• Django REST Framework Certification - Coursera (2022)", normal_style))
    
    # Build PDF
    doc.build(story)
    print(f"Resume PDF created successfully at {pdf_path}")

except ImportError:
    print("reportlab not installed. Install with: pip install reportlab")
