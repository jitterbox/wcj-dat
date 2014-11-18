//-----------------------------------------------------------------------
// <copyright file="LogPatternConverter.cs" company="FSD">
//     Data Tracking System
// </copyright>
//-----------------------------------------------------------------------

namespace FSDTS.Common
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Web;
    using log4net.Layout.Pattern;

    public class LogPatternConverter : PatternLayoutConverter
    {
        StringBuilder stringBuilder = new StringBuilder();

        protected override void Convert(TextWriter writer, log4net.Core.LoggingEvent loggingEvent)
        {
            ////writer.Write("Timestamp: " + stringBuilder.Append("\t") + loggingEvent.TimeStamp + Environment.NewLine + "Controller: " + stringBuilder.Append("\t") + loggingEvent.LocationInformation.ClassName + Environment.NewLine + "Method: " + stringBuilder.Append("\t") + loggingEvent.LocationInformation.MethodName + Environment.NewLine + "Message: " + stringBuilder.Append("\t") + loggingEvent.RenderedMessage.ToString() + Environment.NewLine + "Exception: " + stringBuilder.Append("\t") + loggingEvent.RenderedMessage.ToString() + Environment.NewLine);
            writer.Write("TIMESTAMP:     " + loggingEvent.TimeStamp + Environment.NewLine + "CONTROLLER:    " + loggingEvent.LocationInformation.ClassName + Environment.NewLine + "METHOD:        " + loggingEvent.LocationInformation.MethodName + Environment.NewLine + "MESSAGE:       " + loggingEvent.RenderedMessage.ToString() + Environment.NewLine + "EXCEPTION:     " + loggingEvent.ExceptionObject + Environment.NewLine); ////+ "STACKTRACE:    " + Environment.StackTrace + Environment.NewLine
            writer.Write("------------------------------------------------------" + Environment.NewLine);
        }
    }
}