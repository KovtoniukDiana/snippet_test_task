import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })

export class Snippet extends Document {
    @Prop({ required: true, trim: true })
    title: string

    @Prop({ required: true })
    content: string 

    @Prop({ type: [String], default: [] })
    tags: string[];

    @Prop({ 
        required: true, 
        enum: ['link', 'note', 'command'], 
        default: 'note' 
    })
    type: string;
}

export const SnippetSchema = SchemaFactory.createForClass(Snippet);
SnippetSchema.index({title: 'text', content: 'text'})