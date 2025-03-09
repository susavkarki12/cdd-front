import React from 'react';
import styles from './page.module.css'; // Import CSS Module

const students = [
    { name: "Rajesh", rollNumber: "PUR077BEI031", image: "/rajesh.jpg" },
    { name: "Sachin", rollNumber: "PUR077BEI034", image: "/sachin.jpg" },
    { name: "Susav", rollNumber: "PUR077BEI043", image: "/susav.jpg" },
    { name: "Yogesh", rollNumber: "PUR077BEI046", image: "/yogesh.jpg" }
];

export default function Page() {
    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                {students.map((student, index) => (
                    <li key={index} className={styles.listItem}>
                        <div className={styles.card}>
                            <img src={student.image} alt={student.name} className={styles.profileImage} />
                            <p className={styles.name}>{student.name}</p>
                            <p className={styles.rollNumber}>Roll No: {student.rollNumber}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
